import { IsOptional, IsString, IsNumber } from 'class-validator';
import { EditFlexValueDto } from 'src/flex-value/dto/edit-flex-value.dto';
import { FlexValues } from 'src/flex-value/flex-values.entity';

export class EditFlexHierachyDto {

  @IsOptional()
  @IsNumber()
  currentID?: number;

  listAddId?: number[];
  
  listRemoveId?: number[];
   
  /*
  * Add child or parent: true:child; false-parent
  */
  addChild?: boolean;
 
}