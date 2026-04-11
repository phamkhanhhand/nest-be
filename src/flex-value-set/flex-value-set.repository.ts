import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
 
import { Injectable } from '@nestjs/common';
import { FlexValueSets } from './flex-value-sets.entity';
import { BaseRepository } from 'src/shared/base.responsitory';
import { EditFlexValueSetDto } from './dto/edit-flex-value-set.dto';
import { PagingDto } from 'src/shared/dto/paging.dto';
import { isEmptyString } from 'src/shared/utils';
import { FlexHierarchySet } from './flex-hierachy-set.entity';
 

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

  
  async getHierachySetChild(id: number): Promise<FlexHierarchySet[]> {
    var rs = await  this.executeMappedGen<FlexHierarchySet>(
      `
select *
from bud.adm_flex_hierarchy_set a
where a.parent_flex_value_set_id = ?
      `,
      [id]
    );
    
    return rs||[];
  }

  
  async getHierachySetParent(id: number): Promise<FlexHierarchySet[]> {
    var rs = await  this.executeMappedGen<FlexHierarchySet>(
      `
select *
from bud.adm_flex_hierarchy_set a
where a.child_flex_value_set_id = ?
      `,
      [id]
    );
    
    return rs||[];
  }

   async getByIdRawDto(id: number): Promise<EditFlexValueSetDto | null> {

    var rs = await this.getByIdRaw(id); 
    var rsDto = await  this.mapToDto<EditFlexValueSetDto>(rs);


    return rsDto;
  }


  
    async getPagingAllParentLinkSet(query: PagingDto, id: number) {
      let params = [];
      let sqlScript = `
      
select a.*
from bud.adm_flex_value_sets a
inner join bud.adm_flex_hierarchy_set b on a.flex_value_set_id  = b.parent_flex_value_set_id 
where b.child_flex_value_set_id  = ?

      `; 
        params.push(id);
   
  
      return this.pagingBySql({
        baseSql: sqlScript,
        params: params,
        page: 1,
        pageSize: 10,
        orderBy: ' flex_value_set_code DESC',
      });


}
    async getPagingAllChildLinkSet(query: PagingDto, id: number) {
      let params = [];
      let sqlScript = `
      
select a.*
from bud.adm_flex_value_sets a
inner join bud.adm_flex_hierarchy_set b on a.flex_value_set_id  = b.child_flex_value_set_id 
where b.parent_flex_value_set_id = ?

      `; 
        params.push(id);
   
  
      return this.pagingBySql({
        baseSql: sqlScript,
        params: params,
        page: 1,
        pageSize: 10,
        orderBy: ' flex_value_set_code DESC',
      });


}
  
    async getPagingAllSetForLink(query: PagingDto, id: number) {
      let params = [];
      let sqlScript = `
        select *
        from bud.adm_flex_value_sets a
        `;
  
      if (!isEmptyString(query.searchValue)) {
        sqlScript += ` 
        where a.flex_value_set_name ILIKE ?
        or a.flex_value_set_code   ILIKE ?
      `;
        params.push(`%${query.searchValue}%`);
      }
  
  
      return this.pagingBySql({
        baseSql: sqlScript,
        params: params,
        page: 1,
        pageSize: 10,
        orderBy: 'flexValueSetId DESC',
      });


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