import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

  

@Entity({ tableName: 'adm_flex_hierarchy', schema: 'bud' })
export class FlexHierarchy {

  @PrimaryKey({ type: 'bigint' })
  // flexHierarchyId!: string; // int8 → string (recommend)
  flexHierarchyId!: number; // int8 → string (recommend)

  @Property({ type: 'bigint' })
  parentFlexValueSetId!: number;

  @Property({ type: 'bigint' })
  childFlexValueSetId!: number;

  @Property({ type: 'bigint' })
  parentFlexValueId!: number;

  @Property({ type: 'bigint' })
  childFlexValueId!: number;

  @Property({ type: 'varchar', length: 500, nullable: true })
  childValue?: string;

  @Property({ type: 'varchar', length: 500, nullable: true })
  parentValue?: string;

  @Property({ type: 'number', nullable: true })
  hierarchyType?: number;
}