import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FlexvalueController } from './flex-value.controller';
import { FlexvalueService } from './flex-value.service';
import { FlexValues } from './flex-values.entity';
import { FlexValuesRepository } from './flex-value.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([FlexValues]),
  ],
  controllers: [FlexvalueController],
  providers: [FlexvalueService, FlexValuesRepository],
  exports: [FlexvalueService, FlexValuesRepository],
})
export class FlexvalueModule {}
