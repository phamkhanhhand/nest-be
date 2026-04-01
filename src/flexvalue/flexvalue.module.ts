import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FlexvalueController } from './flexvalue.controller';
import { FlexvalueService } from './flexvalue.service';
import { flexvalue } from './flexvalue.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([flexvalue]),
  ],
  controllers: [FlexvalueController],
  providers: [FlexvalueService],
  exports: [FlexvalueService],
})
export class FlexvalueModule {}
