import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { FlexValueSetService } from './flex-value-set.service';
import { EditFlexValueSetDto } from './dto/edit-flex-value-set.dto';
import { PagingDto } from 'src/shared/dto/paging.dto'; 

@Controller('flex-value-set')
export class FlexValueSetController {


  constructor(private readonly flexValueSetService: FlexValueSetService) {}

 
  @Get()
  getPaging(@Query() query: PagingDto) {
    return this.flexValueSetService.getPagingFlexValue(query);
  }

  @Get(':id') 
  getById(@Param('id') id: number): any {
  // getBySetId(setId: number): any {
    return this.flexValueSetService.getById(id);
  }


  @Post("save")
  save(@Body() dto: EditFlexValueSetDto) {
    return this.flexValueSetService.save(dto);
  } 

  @Delete(':id') 
  deleteById(@Param('id') id: number): any {
    return this.flexValueSetService.delete(id);
  }


  @Get('detail/:id') 
  getByIdWithDetail(@Param('id') id: number): any { 
    return this.flexValueSetService.getByIDWithDetail(id);
  }


}
