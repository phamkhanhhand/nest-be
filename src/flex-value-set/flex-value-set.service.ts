import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { EditFlexValueSetDto } from './dto/edit-flex-value-set.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { BaseService } from 'src/shared/base.service';
import { PagingDto } from 'src/shared/dto/paging.dto';
import { FlexValueSets } from './flex-value-sets.entity';
import { FlexValueSetRepository } from './flex-value-set.repository';
import { FlexValuesRepository } from 'src/flex-value/flex-value.repository';
import { FlexValues } from 'src/flex-value/flex-values.entity'; 

@Injectable()
export class FlexValueSetService extends BaseService {

  constructor(
    readonly em: EntityManager,
    @InjectRepository(FlexValueSets)
    private readonly flexvalueRepository: EntityRepository<FlexValueSets>,
    private readonly flexValuesSetRepositoryImpl: FlexValueSetRepository,
    private readonly flexValuesRepositoryImpl: FlexValuesRepository,
  ) {
    super(em);
  }

  async getPagingFlexValue(query: PagingDto) {

    const filter: any = {};

    if (query.searchValue) {
      filter.$or = [
        { flexValueSetCode: { $ilike: `%${query.searchValue}%` } },
        { flexValueSetName: { $ilike: `%${query.searchValue}%` } },
      ];
    }

    return super.getPaging(
      FlexValueSets,
      filter,
      query.page,
      query.pageSize,
      {
        orderBy: { flexValueSetId: 'desc' },
      }
    );
  }

  async getByIDWithDetail(id: number): Promise<any> {
    var masterDto = (await this.flexValuesSetRepositoryImpl.getByIdRawDto(id));

    //list detail
    var detail = (await this.flexValuesRepositoryImpl.getBySetIdRaw(id) as FlexValues[]);
    masterDto.detail = detail;

    return masterDto;
  }



  async getById(id: number): Promise<any> {
    var master = (await this.flexValuesSetRepositoryImpl.getByIdRaw(id));

    //list detail
    var detail = (await this.flexValuesRepositoryImpl.getBySetIdRaw(id) as FlexValues[]);


    return master;
  }

  async save(dto: EditFlexValueSetDto) {

     var entity: FlexValueSets = null;
    // 👉 UPDATE
    if (dto.flexValueSetId) {
      const id = dto.flexValueSetId;

        entity = await this.em.findOne(FlexValueSets, { flexValueSetId: id });

      if (!entity) {
        throw new Error('FlexValueSet not found');
      }

      this.em.assign(entity, {
        flexValueSetId: dto.flexValueSetId,
        flexValueSetCode: dto.flexValueSetCode,
        flexValueSetName: dto.flexValueSetName,
        enableFlag: dto.enableFlag,
        period: dto.period,
        description: dto.description,
        editVersion: new Date(),
        modifiedBy: 'system', 
      });
 
    }

    else{
      
    // 👉 INSERT
     entity = this.em.create(FlexValueSets, {
      // flexValueSetId: dto.flexValueSetId?.toString(),
      flexValueSetCode: dto.flexValueSetCode,
      flexValueSetName: dto.flexValueSetName,
      enableFlag: dto.enableFlag,
      period: dto.period,
      description: dto.description,
      editVersion: new Date(),
      createdBy: 'system',
      // createdDate: new Date(),
    });

      this.em.persist(entity);

    }



    //detail
    var detail = dto.detail;

    for (const d of detail) {
  let detailEntity;

  if (d.flexValueId) {
    // 👉 UPDATE
    detailEntity = await this.em.findOne(FlexValues, {
      flexValueId: Number(d.flexValueId),
    });

    if (detailEntity) {
      this.em.assign(detailEntity, {
        flexValue: d.flexValue,
        description: d.description,
        editVersion: new Date(),
      });
    } else {
      // 👉 nếu không tồn tại thì insert
      detailEntity = this.em.create(FlexValues, {
        flexValueSetId: entity.flexValueSetId,
        flexValue: d.flexValue,
        description: d.description,
        editVersion: new Date(),
      });

      this.em.persist(detailEntity);
    }

  } else {
    // 👉 INSERT mới
    detailEntity = this.em.create(FlexValues, {
      flexValueSetId: entity.flexValueSetId,
      flexValue: d.flexValue,
      description: d.description,
      editVersion: new Date(),
    });

    this.em.persist(detailEntity);
  }
}
 

    var listDeletedId = dto.listDelete;

    if (listDeletedId && listDeletedId.length > 0) {

      this.deleteByIds( listDeletedId)

    }



    await this.em.flush(); // 🔥 batch tại đây


    return entity;
  }


  async deleteByIds( ids: number[]) {
    await this.em.nativeDelete(FlexValues, {
      flexValueId: { $in: ids },
    });
  }
 

  async delete(id: number): Promise<void> {
    const deleted = await this.em.nativeDelete(FlexValueSets, {
      flexValueSetId: id,
    });

    if (!deleted) {
      throw new Error('FlexValueSet not found');
    }
  }

  getByIDWithDetail1(id: number): Promise<any> {
    return Promise.all([
      this.flexValuesSetRepositoryImpl.getByIdRawDto(id),
      this.flexValuesRepositoryImpl.getBySetIdRaw(id)
    ])
      .then(([masterDto, detail]) => {

        if (!masterDto) return null;

        masterDto.detail = detail;
        return masterDto;
      });
  }


}
