import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
 
import { Injectable } from '@nestjs/common';
 

@Injectable()
export class FlexValueSetRepository //extends EntityRepository<FlexValues> 
{

  constructor(private readonly em: EntityManager) {}


  async getByIdRaw(id: number) {
    const em = this.em;

    return em.execute(`
      
      SELECT a.flex_value_set_id, a.flex_value_set_name, a.enable_flag, a."period", a.description, a.edit_version, a.created_by, a.created_date, a.modified_by, a.modified_date
      FROM   bud.adm_flex_value_sets a 
      WHERE a.flex_value_set_id = ?
    `, [id]);
  }

}