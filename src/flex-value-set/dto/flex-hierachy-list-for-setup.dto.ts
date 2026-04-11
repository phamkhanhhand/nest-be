import { IsOptional, IsString, IsNumber } from 'class-validator';
import { EditFlexValueDto } from 'src/flex-value/dto/edit-flex-value.dto';
import { FlexValues } from 'src/flex-value/flex-values.entity';
import { PagingResult } from 'src/shared/base.responsitory';
import { FlexHierarchySet } from '../flex-hierachy-set.entity';

export class FlexHierachyListForSetupDto {
 
  listSet?: PagingResult<any>;

  listChild?: FlexHierarchySet[];
  
  listParent?: FlexHierarchySet[];
    
 
}