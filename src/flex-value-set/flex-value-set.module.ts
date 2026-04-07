import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';    
import { FlexValueSets } from './flex-value-sets.entity';
import { FlexValueSetController } from './flex-value-set.controller';
import { FlexValueSetService } from './flex-value-set.service';
import { FlexValueSetRepository } from './flex-value-set.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([FlexValueSets]),
  ],
  controllers: [FlexValueSetController],
  providers: [FlexValueSetService, FlexValueSetRepository],
  exports: [FlexValueSetService],
})
export class FlexValueSetModule {}
