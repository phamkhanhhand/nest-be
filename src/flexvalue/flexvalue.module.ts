import { Module } from '@nestjs/common';
import { FlexvalueService } from './flexvalue.service'; 
import { FlexvalueController } from './flexvalue.controller';

@Module({
  providers: [FlexvalueService],
  controllers: [FlexvalueController]
})
export class FlexvalueModule {}
