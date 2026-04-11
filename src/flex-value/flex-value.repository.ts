import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { FlexValues } from './flex-values.entity';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.responsitory';
import { isEmptyString } from 'src/shared/utils';
import { PagingDto } from 'src/shared/dto/paging.dto';
import { FlexHierarchy } from './flex-hierachy.entity';
import { EditFlexValueDto } from './dto/edit-flex-value.dto';


@Injectable()
export class FlexValuesRepository extends BaseRepository<FlexValues> {

  constructor(readonly em: EntityManager) {
    super(em, FlexValues);
  }



  public async getBySetIdRaw(setId: number) {

     var rs = await  this.executeMapped(
      `
       SELECT fv.*,
             fvs.flex_value_set_name
      FROM bud.adm_flex_values fv
      LEFT JOIN bud.adm_flex_value_sets fvs
        ON fv.flex_value_set_id = fvs.flex_value_set_id
      WHERE fv.flex_value_set_id = ?
      `,
      [setId]
    );

    return rs||[];

  }


  async getHierachyChild(id: number): Promise<FlexHierarchy[]> {
    var rs = await this.executeMappedGen<FlexHierarchy>(
      `
 select *
 from bud.adm_flex_hierarchy a
 where a.parent_flex_value_id = ?
       `,
      [id]
    );

    return rs || [];
  }


  async getHierachyParent(id: number): Promise<FlexHierarchy[]> {
    var rs = await this.executeMappedGen<FlexHierarchy>(
      `
 select *
 from bud.adm_flex_hierarchy a
 where a.child_flex_value_id = ?
       `,
      [id]
    );

    return rs || [];
  }



  async getPagingAllForLink(query: PagingDto, id: number) {
    let params = [];
    let sqlScript = `
         select *
         from bud.adm_flex_values a
         `;

    if (!isEmptyString(query.searchValue)) {
      sqlScript += ` 
         where a.flex_value_name ILIKE ?
         or a.flex_value_code   ILIKE ?
       `;
      params.push(`%${query.searchValue}%`);
    }


    return this.pagingBySql({
      baseSql: sqlScript,
      params: params,
      page: 1,
      pageSize: 10,
      orderBy: 'flexValueId DESC',
    });


  }

}