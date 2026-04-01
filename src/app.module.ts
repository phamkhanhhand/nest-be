import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudgetsModule } from './budgets/budgets.module';
import { FlexvalueModule } from './flexvalue/flexvalue.module';

@Module({
  imports: [BudgetsModule, FlexvalueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
