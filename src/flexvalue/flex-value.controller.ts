import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FlexvalueService } from './flex-value.service';
import { EditFlexValueDto } from './dto/edit-flex-value.dto';
import { PagingDto } from 'src/shared/dto/paging.dto';

@Controller('flex-value')
export class FlexvalueController {


  constructor(private readonly flexValueService: FlexvalueService) {}

 
  @Get('set/:setId') 
  getBySetId(@Param('setId') setId: number): any {
  // getBySetId(setId: number): any {
    return this.flexValueService.getBySetId(setId);
  }


  @Post()
  save(@Body() dto: EditFlexValueDto) {
    return this.flexValueService.save(dto);
  }


  @Get()
  getPaging(@Query() query: PagingDto) {
    return this.flexValueService.getPagingFlexValue(query);
  }

}
