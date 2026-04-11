import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

  

@Entity({ tableName: 'adm_flex_hierarchy_set', schema: 'bud' })
export class FlexHierarchySet {

  @PrimaryKey({ fieldName: 'flex_hierarchy_set_id', type: 'bigint' }) 
  flexHierarchySetId!: number;  

  @Property({ fieldName: 'parent_flex_value_set_id', type: 'bigint' })
  parentFlexValueSetId!: number;

  @Property({ fieldName: 'child_flex_value_set_id', type: 'bigint' })
  childFlexValueSetId!: number;
  
}