import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { FlexValues } from './flex-values.entity';
import { FlexValuesRepository } from './flex-value.repository';
import { EditFlexValueDto } from './dto/edit-flex-value.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { BaseService } from 'src/shared/base.service';
import { PagingDto } from 'src/shared/dto/paging.dto';

@Injectable()
export class FlexvalueService extends BaseService {

  constructor(
      readonly em: EntityManager,
    @InjectRepository(FlexValues)
    private readonly flexvalueRepository: EntityRepository<FlexValues>,
    private readonly flexValuesRepositoryImpl: FlexValuesRepository,
  ) { 

    
    super(em);
  }
 
  async getPagingFlexValue(query: PagingDto) {
    return super.getPaging(
      FlexValues,
      {}, // filter
      query.page,
      query.pageSize,
      {
        orderBy: { flexValueId: 'desc' },
      }
    );
  }


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

async save(dto: EditFlexValueDto) {

  // 👉 UPDATE
  if (dto.flexValueId) {
    const id = dto.flexValueId;

    const entity = await this.em.findOne(FlexValues, { flexValueId: id });

    if (!entity) {
      throw new Error('FlexValue not found');
    }

    this.em.assign(entity, {
      flexValueSetId: dto.flexValueSetId?.toString(),
      flexValue: dto.flexValue,
      flexValueName: dto.flexValueName,
      enableFlag: dto.enableFlag,
      period: dto.period,
      description: dto.description,

      editVersion: new Date(),
      modifiedBy: 'system',
      modifiedDate: new Date(),
    });

    await this.em.flush();

    return entity;
  }

  // 👉 INSERT
  const entity = this.em.create(FlexValues, {
    flexValueSetId: dto.flexValueSetId?.toString(),
    flexValue: dto.flexValue,
    flexValueName: dto.flexValueName,
    enableFlag: dto.enableFlag,
    period: dto.period,
    description: dto.description,

    editVersion: new Date(),
    createdBy: 'system',
    createdDate: new Date(),
  });

  await this.em.persistAndFlush(entity);

  return entity;
}


  async getByID(id: number): Promise<any> {
    // return (await this.flexValuesRepositoryImpl.getByIdRaw(id)).find((item: any) => item.flexValueSetId === id);
  }
  async delete(id: number): Promise<void> {
    const deleted = await this.em.nativeDelete(FlexValues, {
      flexValueId: id,
    });

    if (!deleted) {
      throw new Error('FlexValueSet not found');
    }
  }


}
