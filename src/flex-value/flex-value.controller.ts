import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { FlexvalueService } from './flex-value.service';
import { EditFlexValueDto } from './dto/edit-flex-value.dto';
import { PagingDto } from 'src/shared/dto/paging.dto';
import { EditFlexHierachyDto } from 'src/flex-value-set/dto/edit-flex-hierachy.dto';

@Controller('flex-value')
export class FlexvalueController {


  constructor(private readonly flexValueService: FlexvalueService) { }


  // @Get()
  // getPaging(@Query() query: PagingDto) {
  //   return this.flexValueService.getPagingFlexValue(query);
  // }


  @Get("getPagingAllForLink/:id")
  getPagingAllForLink(@Query() query: PagingDto, @Param('id') id: number) {
    return this.flexValueService.getPagingAllForLink(query, id);
  }


  @Post('addLink')
  addLink(@Body() dto: EditFlexHierachyDto) {

    return this.flexValueService.addLink(dto);
  }

}
