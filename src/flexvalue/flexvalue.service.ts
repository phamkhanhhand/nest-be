import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { flexvalue } from './flexvalue.entity';

@Injectable()
export class FlexvalueService {

constructor(
  @InjectRepository(flexvalue)
  private readonly flexvalueRepository: EntityRepository<flexvalue>,
) {}


  async getHello(): Promise<any> {
    return await this.flexvalueRepository.findAll();
  }

}
