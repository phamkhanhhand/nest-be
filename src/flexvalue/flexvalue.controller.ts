import { Controller, Get } from '@nestjs/common';
import { FlexvalueService } from './flexvalue.service';

@Controller('flexvalue')
export class FlexvalueController {


  constructor(private readonly appService: FlexvalueService) {}



  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
