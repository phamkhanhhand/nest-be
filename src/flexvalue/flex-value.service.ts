import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { FlexValues } from './flex-values.entity';
import { FlexValuesRepository } from './flex-value.repository';
import { CreateFlexValueDto } from './dto/create-flex-value.dto';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class FlexvalueService {

  constructor(
    private readonly em: EntityManager,
    @InjectRepository(FlexValues)
    private readonly flexvalueRepository: EntityRepository<FlexValues>,
    private readonly flexValuesRepositoryImpl: FlexValuesRepository,
  ) { }

  async getBySetId(setId: number): Promise<any> {

    return this.flexValuesRepositoryImpl.getBySetIdRaw(setId);
    

    return this.flexvalueRepository.find(
      { flexValueSetId: setId.toString() },
      { orderBy: { flexValueId: 'ASC' } }
    );

    // return await this.flexvalueRepository.getBySetId(setId);
  }

  // async getHello(): Promise<any> {
  //   return await this.flexvalueRepository.findAll();
  // }


  async create(dto: CreateFlexValueDto) {

    const entity = this.em.create(FlexValues, {
      flexValueSetId: dto.flexValueSetId?.toString(),
      flexValue: dto.flexValue,
      flexValueName: dto.flexValueName,
      enableFlag: dto.enableFlag,
      period: dto.period,
      description: dto.description,

      editVersion: new Date(), // NOT NULL

      createdBy: 'system', // hoặc lấy từ user login
      createdDate: new Date(),

    });

    await this.em.persistAndFlush(entity);

    return entity;
  }

}
