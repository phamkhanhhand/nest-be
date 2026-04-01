import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'flexvalue', schema: 'bud' })

export class flexvalue {
  @PrimaryKey()
  id: number;

  @Property()
  flexvalue: string;

  @Property()
  flexvaluename: string;
}