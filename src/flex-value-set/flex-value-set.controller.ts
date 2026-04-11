import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { FlexValueSetService } from './flex-value-set.service';
import { EditFlexValueSetDto } from './dto/edit-flex-value-set.dto';
import { PagingDto } from 'src/shared/dto/paging.dto'; 
import { EditFlexHierachyDto } from './dto/edit-flex-hierachy.dto';

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
 
  
  @Get("getPagingAllForLink/:id")
  getPagingAllSetForLink(@Query() query: PagingDto,@Param('id') id: number) {
    return this.flexValueSetService.getPagingAllSetForLink(query, id);
  }


  @Get("getPagingAllForLink/:id")
  getPagingAllChildLinkSet(@Query() query: PagingDto,@Param('id') id: number) {
    return this.flexValueSetService.getPagingAllChildLinkSet(query, id);
  }

  @Get("getPagingAllParentLinkSet/:id")
  getPagingAllParentLinkSet(@Query() query: PagingDto,@Param('id') id: number) {
    return this.flexValueSetService.getPagingAllParentLinkSet(query, id);
  }

  @Post('addLink')  
  addLink(@Body() dto: EditFlexHierachyDto) {
 
    return this.flexValueSetService.addLink(dto);
  }


}
