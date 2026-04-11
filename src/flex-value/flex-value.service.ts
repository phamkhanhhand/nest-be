import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { FlexValues } from './flex-values.entity';
import { FlexValuesRepository } from './flex-value.repository';
import { EditFlexValueDto } from './dto/edit-flex-value.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { BaseService } from 'src/shared/base.service';
import { PagingDto } from 'src/shared/dto/paging.dto';
import { EditFlexHierachyDto } from 'src/flex-value-set/dto/edit-flex-hierachy.dto';
import { FlexHierarchy } from './flex-hierachy.entity';
import { FlexHierachyListForSetupDto } from './dto/flex-hierachy-list-for-setup.dto';

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

  // async getPagingFlexValue(query: PagingDto) {
  //   return super.getPaging(
  //     FlexValues,
  //     {}, // filter
  //     query.page,
  //     query.pageSize,
  //     {
  //       orderBy: { flexValueId: 'desc' },
  //     }
  //   );
  // }



  addLink(dto: EditFlexHierachyDto) {

    var listAdd = dto.listAddId;
    var listRemove = dto.listRemoveId;
    var currentId = dto.currentID;

    if (listAdd && listAdd.length > 0) {

      for (var e of listAdd) {
        var hierachy = null;

        if (dto.addChild) {
          hierachy = this.em.create(FlexHierarchy, {
            childFlexValueId: e,
            parentFlexValueId: currentId,
          });
        }
        else {
          hierachy = this.em.create(FlexHierarchy, {
            childFlexValueId: currentId,
            parentFlexValueId: e,
          });
        }

        this.em.persist(hierachy);


      }
    }

    if (listRemove && listRemove.length > 0) {

      this.em.nativeDelete(FlexHierarchy, {
        flexHierarchyId: { $in: listRemove },
      });

    }
    //delete


    this.em.flush();
  }



  async getPagingAllForLink(query: PagingDto, id: number) {

    let dataList = await this.flexValuesRepositoryImpl.getPagingAllForLink(query, id);

    //get list checked

    let listCheckChild = await this.flexValuesRepositoryImpl.getHierachyChild(id);
    let listCheckParent = await this.flexValuesRepositoryImpl.getHierachyParent(id);

    let rs: FlexHierachyListForSetupDto = {};

    rs.listSet = dataList;
    rs.listChild = listCheckChild;
    rs.listParent = listCheckParent;

    return rs;
  }

}
