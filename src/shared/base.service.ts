import { EntityManager,     } from '@mikro-orm/postgresql'; 
import { EntityName, FilterQuery } from '@mikro-orm/core';


export class BaseService {

  constructor(protected readonly em: EntityManager) {}

  async getPaging<T extends object>(
    entity: EntityName<T>,
    filter: FilterQuery<T>,
    page: number,
    pageSize: number,
    options?: any,
  ) {
    const [data, total] = await this.em.findAndCount(entity, filter, {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      ...options,
    });

    return {
      data,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }
}