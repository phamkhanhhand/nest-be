import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
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
 
  @Get()
  getPaging(@Query() query: PagingDto) {
    return this.flexValueService.getPagingFlexValue(query);
  }

  @Get(':id') 
  getById(@Param('id') id: number): any {
  // getBySetId(setId: number): any {
    return this.flexValueService.getByID(id);
  }


  @Post("save")
  save(@Body() dto: EditFlexValueDto) {
    return this.flexValueService.save(dto);
  } 

  @Delete(':id') 
  deleteById(@Param('id') id: number): any {
    return this.flexValueService.delete(id);
  }

}
