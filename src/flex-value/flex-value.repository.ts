import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { FlexValues } from './flex-values.entity';
import { Injectable } from '@nestjs/common';
 

@Injectable()
export class FlexValuesRepository //extends EntityRepository<FlexValues> 
{

  constructor(private readonly em: EntityManager) {}


  async getBySetIdRaw(setId: number) {
    const em = this.em;

    return em.execute(`
      SELECT fv.flex_value_id,
             fv.flex_value,
             fvs.flex_value_set_name
      FROM bud.adm_flex_values fv
      LEFT JOIN bud.adm_flex_value_sets fvs
        ON fv.flex_value_set_id = fvs.flex_value_set_id
      WHERE fv.flex_value_set_id = ?
    `, [setId]);
  }

}