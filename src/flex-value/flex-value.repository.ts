import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { FlexValues } from './flex-values.entity';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.responsitory';
 

@Injectable()
export class FlexValuesRepository extends BaseRepository<FlexValues> 
{

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

 

}