import { EntityName } from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

import { Injectable } from '@nestjs/common';
export interface PagingResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
  };
}

export class BaseRepository<T> {
  constructor(
    protected readonly em: EntityManager,
    // protected readonly entity: EntityName<T>,
    protected readonly entity: { new(): T }
  ) { }

  protected getMeta() {
    return this.em.getMetadata().get(this.entity.name);
  }


  // =========================
  // 🔥 CORE: RAW → ENTITY MAP
  // =========================
  protected mapRawToEntity(raw: any): T {
    const meta = this.getMeta();
    const mapped: any = {};

    for (const prop of Object.values(meta.properties)) {
      const fieldName = prop.fieldNames?.[0];
      const propName = prop.name;

      if (!fieldName) continue;

      let value = raw[fieldName];


      const columnType = prop.type?.toLowerCase();


      // handle bigint
      if (

        (

          // columnType?.includes('int') ||   // int2, int4, int8
          // columnType?.includes('numeric') ||
          // columnType?.includes('decimal') ||

          // prop.type === 'bigint'
          //  || prop.type === 'biginttype'
             prop.type === 'number'
           || prop.type === 'decimal'
           || prop.type === 'BigInt') && value != null) {
        value = Number(value);
      }

      // handle date
      if ((prop.type === 'Date' 
       // || prop.type === 'datetime'
        //  || prop.type === 'date'
        ) && value) {
        value = new Date(value);
      }

      mapped[propName] = value;
    }

    return mapped as T;
  }

  protected mapRawToEntities(raws: any[]): T[] {
    return raws.map(r => this.mapRawToEntity(r));
  }

  // =========================
  // 🔥 RAW QUERY (MAPPED)
  // =========================
  async executeMapped(sql: string, params?: any[]): Promise<T[]> {
    const raw = await this.em.execute(sql, params);
    return this.mapRawToEntities(raw);
  }

  // =========================
  // 🔥 GET BY ID (RAW)
  // =========================
  async getById(id: number, idColumn = 'id'): Promise<T | null> {
    const meta = this.em.getMetadata().get(this.entity as any);
    const table = `${meta.schema}.${meta.tableName}`;

    const sql = `
      SELECT *
      FROM ${table}
      WHERE ${idColumn} = ?
      LIMIT 1
    `;

    const result = await this.executeMapped(sql, [id]);
    return result[0] || null;
  }

  // =========================
  // 🔥 PAGING (RAW)
  // =========================
  async getPaging(options: {
    page: number;
    pageSize: number;
    where?: string;      // custom WHERE
    params?: any[];      // params cho WHERE
    orderBy?: string;    // ORDER BY
  }): Promise<PagingResult<T>> {
    const { page, pageSize, where, params = [], orderBy } = options;

    const meta = this.em.getMetadata().get(this.entity as any);
    const table = `${meta.schema}.${meta.tableName}`;

    const offset = (page - 1) * pageSize;

    const whereClause = where ? `WHERE ${where}` : '';
    const orderClause = orderBy ? `ORDER BY ${orderBy}` : '';

    // data query
    const dataSql = `
      SELECT *
      FROM ${table}
      ${whereClause}
      ${orderClause}
      LIMIT ? OFFSET ?
    `;

    const data = await this.executeMapped(dataSql, [
      ...params,
      pageSize,
      offset,
    ]);

    // total query
    const countSql = `
      SELECT COUNT(*) as total
      FROM ${table}
      ${whereClause}
    `;

    const countResult = await this.em.execute(countSql, params);
    const total = Number(countResult[0]?.total || 0);

    return {
      data,
      meta: {
        total,
        page,
        pageSize,
      },
    };
  }

  // =========================
  // 🔥 SIMPLE SEARCH (LIKE)
  // =========================
  async search(options: {
    page: number;
    pageSize: number;
    keyword?: string;
    searchColumns?: string[];
  }): Promise<PagingResult<T>> {
    const { keyword, searchColumns = [], page, pageSize } = options;

    if (!keyword || searchColumns.length === 0) {
      return this.getPaging({ page, pageSize });
    }

    const likeClause = searchColumns
      .map(col => `${col} ILIKE ?`)
      .join(' OR ');

    const params = searchColumns.map(() => `%${keyword}%`);

    return this.getPaging({
      page,
      pageSize,
      where: `(${likeClause})`,
      params,
    });
  }



  //#region map dto
  protected snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
  }

  async mapToDto<T>(row: any): Promise<T> {
    const result: any = {};

    Object.keys(row).forEach(key => {
      const camelKey = this.snakeToCamel(key);
      result[camelKey] = row[key];
    });

    return result as T;
  }


  //#endregion
}