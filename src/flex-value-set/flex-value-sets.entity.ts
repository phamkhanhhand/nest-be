import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
 

@Entity({ tableName: 'adm_flex_value_sets', schema: 'bud' })
export class FlexValueSets {

  @PrimaryKey({ fieldName: 'flex_value_set_id', type: 'bigint' })
  // flexValueSetId!: string;
  flexValueSetId!: number;

  @Property({ fieldName: 'flex_value_set_name', length: 500, nullable: true })
  flexValueSetName?: string;
  @Property({ fieldName: 'flex_value_set_code', length: 256, nullable: true })
  flexValueSetCode?: string;

  @Property({ fieldName: 'enable_flag', length: 10, nullable: true })
  enableFlag?: string;

  @Property({ fieldName: 'period', length: 10, nullable: true })
  period?: string;

  @Property({ fieldName: 'description', length: 500, nullable: true })
  description?: string;

  // timestamp
  @Property({ fieldName: 'edit_version', type: 'Date' })
  editVersion!: Date;

  @Property({ fieldName: 'created_by', length: 255, nullable: true })
  createdBy?: string;

  // date (không có time)
  @Property({ fieldName: 'created_date', type: 'date', nullable: true })
  createdDate?: string; // ⚠️ dùng string (YYYY-MM-DD)

  @Property({ fieldName: 'modified_by', length: 255, nullable: true })
  modifiedBy?: string;

  // time (chỉ giờ phút giây)
  @Property({ fieldName: 'modified_date', type: 'time', nullable: true })
  modifiedDate?: string; // ⚠️ dùng string (HH:mm:ss)
}