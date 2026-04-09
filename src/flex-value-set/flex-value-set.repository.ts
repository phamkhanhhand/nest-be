import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
 
import { Injectable } from '@nestjs/common';
import { FlexValueSets } from './flex-value-sets.entity';
import { BaseRepository } from 'src/shared/base.responsitory';
import { EditFlexValueSetDto } from './dto/edit-flex-value-set.dto';
 

@Injectable()
export class FlexValueSetRepository extends BaseRepository<FlexValueSets> 
{

  constructor(readonly em: EntityManager) {

    super(em, FlexValueSets);
  }



  async getByIdRaw(id: number): Promise<FlexValueSets> {
    var rs = await  this.executeMapped(
      `
      
      SELECT a.*
      FROM   bud.adm_flex_value_sets a 
      WHERE a.flex_value_set_id = ?
      `,
      [id]
    );
    
    return rs[0]||null;
  }

  
   async getByIdRawDto(id: number): Promise<EditFlexValueSetDto | null> {

    var rs = await this.getByIdRaw(id); 
    var rsDto = await  this.mapToDto<EditFlexValueSetDto>(rs);


    return rsDto;
  }


//   async  getByIdRaw1(id: number):Promise<FlexValueSets[] > {
//     const em = this.em;
//     const result = await em.execute(`
      
//       SELECT a.*
//       FROM   bud.adm_flex_value_sets a 
//       WHERE a.flex_value_set_id = ?
//     `, [id]);

// return result.map(r => ({
//   flexValueSetId: Number(r.flex_value_set_id),
//   flexValueSetName: r.flex_value_set_name,
//   enableFlag: r.enable_flag,
//   period: r.period,
//   description: r.description,
//   editVersion: r.edit_version,
//   createdBy: r.created_by,
//   createdDate: r.created_date,
//   modifiedBy: r.modified_by,
//   modifiedDate: r.modified_date
// })); 

//   }

}