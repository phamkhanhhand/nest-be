import { IsOptional, IsString, IsNumber } from 'class-validator';
import { EditFlexValueDto } from 'src/flex-value/dto/edit-flex-value.dto';
import { FlexValues } from 'src/flex-value/flex-values.entity';

export class EditFlexValueSetDto {

  @IsOptional()
  @IsNumber()
  flexValueSetId?: number;
 
  
  @IsOptional()
  @IsString()
  flexValueSetCode?: string;

  @IsOptional()
  @IsString()
  flexValueSetName?: string;

  @IsOptional()
  @IsString()
  enableFlag?: string;

  @IsOptional()
  @IsString()
  period?: string;

  @IsOptional()
  @IsString()
  description?: string;

  // có thể thêm attribute nếu cần

  detail: EditFlexValueDto[];
  listDelete: number[];
}