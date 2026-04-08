import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { EditFlexValueSetDto } from './dto/edit-flex-value-set.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { BaseService } from 'src/shared/base.service';
import { PagingDto } from 'src/shared/dto/paging.dto';
import { FlexValueSets } from './flex-value-sets.entity';
import { FlexValueSetRepository } from './flex-value-set.repository';

@Injectable()
export class FlexValueSetService extends BaseService {

  constructor(
    readonly em: EntityManager,
    @InjectRepository(FlexValueSets)
    private readonly flexvalueRepository: EntityRepository<FlexValueSets>,
    private readonly flexValuesRepositoryImpl: FlexValueSetRepository,
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

  async getByID(id: number): Promise<any> {
    return (await this.flexValuesRepositoryImpl.getByIdRaw(id)).find((item: any) => item.flexValueSetId === id);
  }

  async save(dto: EditFlexValueSetDto) {

    // 👉 UPDATE
    if (dto.flexValueSetId) {
      const id = dto.flexValueSetId;

      const entity = await this.em.findOne(FlexValueSets, { flexValueSetId: id });

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
        // modifiedDate: new Date(),
      });

      await this.em.flush();
      return entity;
    }

    // 👉 INSERT
    const entity = this.em.create(FlexValueSets, {
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

    await this.em.persistAndFlush(entity);

    return entity;
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.em.nativeDelete(FlexValueSets, {
      flexValueSetId: id,
    });

    if (!deleted) {
      throw new Error('FlexValueSet not found');
    }
  }

}
