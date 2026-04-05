import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FlexvalueService } from './flex-value.service';
import { CreateFlexValueDto } from './dto/create-flex-value.dto';

@Controller('flex-value')
export class FlexvalueController {


  constructor(private readonly flexValueService: FlexvalueService) {}

 
  @Get('set/:setId') 
  getBySetId(@Param('setId') setId: number): any {
  // getBySetId(setId: number): any {
    return this.flexValueService.getBySetId(setId);
  }


  @Post()
  create(@Body() dto: CreateFlexValueDto) {
    return this.flexValueService.create(dto);
  }

}
