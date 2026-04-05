import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
 

// export class FlexValue {
//   @PrimaryKey()
//   id: number;

//   @Property()
//   flexvalue: string;

//   @Property()
//   flexvaluename: string;
// }
 

@Entity({ tableName: 'adm_flex_values', schema: 'bud' })
export class FlexValues {

  @PrimaryKey({ fieldName: 'flex_value_id', type: 'bigint' })
  flexValueId!: number;

  @Property({ fieldName: 'flex_value_set_id', type: 'bigint', nullable: true })
  flexValueSetId?: string;

  @Property({ fieldName: 'flex_value', length: 500, nullable: true })
  flexValue?: string;

  @Property({ fieldName: 'flex_value_name', length: 500, nullable: true })
  flexValueName?: string;

  @Property({ fieldName: 'enable_flag', length: 10, nullable: true })
  enableFlag?: string;

  @Property({ fieldName: 'period', length: 10, nullable: true })
  period?: string;

  @Property({ fieldName: 'description', length: 500, nullable: true })
  description?: string;

  @Property({ fieldName: 'edit_version', type: 'Date' })
  editVersion!: Date;

  @Property({ fieldName: 'created_by', length: 255, nullable: true })
  createdBy?: string;

  @Property({ fieldName: 'created_date', type: 'Date', nullable: true })
  createdDate?: Date;

  @Property({ fieldName: 'modified_by', length: 255, nullable: true })
  modifiedBy?: string;

  @Property({ fieldName: 'modified_date', type: 'Date', nullable: true })
  modifiedDate?: Date;

  // 🔥 attributes 1 → 15
  @Property({ fieldName: 'attribute1', length: 256, nullable: true }) attribute1?: string;
  @Property({ fieldName: 'attribute2', length: 256, nullable: true }) attribute2?: string;
  @Property({ fieldName: 'attribute3', length: 256, nullable: true }) attribute3?: string;
  @Property({ fieldName: 'attribute4', length: 256, nullable: true }) attribute4?: string;
  @Property({ fieldName: 'attribute5', length: 256, nullable: true }) attribute5?: string;
  @Property({ fieldName: 'attribute6', length: 256, nullable: true }) attribute6?: string;
  @Property({ fieldName: 'attribute7', length: 256, nullable: true }) attribute7?: string;
  @Property({ fieldName: 'attribute8', length: 256, nullable: true }) attribute8?: string;
  @Property({ fieldName: 'attribute9', length: 256, nullable: true }) attribute9?: string;
  @Property({ fieldName: 'attribute10', length: 256, nullable: true }) attribute10?: string;
  @Property({ fieldName: 'attribute11', length: 256, nullable: true }) attribute11?: string;
  @Property({ fieldName: 'attribute12', length: 256, nullable: true }) attribute12?: string;
  @Property({ fieldName: 'attribute13', length: 256, nullable: true }) attribute13?: string;
  @Property({ fieldName: 'attribute14', length: 256, nullable: true }) attribute14?: string;
  @Property({ fieldName: 'attribute15', length: 256, nullable: true }) attribute15?: string;

  // 🔥 attribute labels 1 → 15
  @Property({ fieldName: 'attribute_label1', length: 256, nullable: true }) attributeLabel1?: string;
  @Property({ fieldName: 'attribute_label2', length: 256, nullable: true }) attributeLabel2?: string;
  @Property({ fieldName: 'attribute_label3', length: 256, nullable: true }) attributeLabel3?: string;
  @Property({ fieldName: 'attribute_label4', length: 256, nullable: true }) attributeLabel4?: string;
  @Property({ fieldName: 'attribute_label5', length: 256, nullable: true }) attributeLabel5?: string;
  @Property({ fieldName: 'attribute_label6', length: 256, nullable: true }) attributeLabel6?: string;
  @Property({ fieldName: 'attribute_label7', length: 256, nullable: true }) attributeLabel7?: string;
  @Property({ fieldName: 'attribute_label8', length: 256, nullable: true }) attributeLabel8?: string;
  @Property({ fieldName: 'attribute_label9', length: 256, nullable: true }) attributeLabel9?: string;
  @Property({ fieldName: 'attribute_label10', length: 256, nullable: true }) attributeLabel10?: string;
  @Property({ fieldName: 'attribute_label11', length: 256, nullable: true }) attributeLabel11?: string;
  @Property({ fieldName: 'attribute_label12', length: 256, nullable: true }) attributeLabel12?: string;
  @Property({ fieldName: 'attribute_label13', length: 256, nullable: true }) attributeLabel13?: string;
  @Property({ fieldName: 'attribute_label14', length: 256, nullable: true }) attributeLabel14?: string;
  @Property({ fieldName: 'attribute_label15', length: 256, nullable: true }) attributeLabel15?: string;

  @Property({ fieldName: 'ref_id', type: 'bigint', nullable: true })
  refId?: string;
}