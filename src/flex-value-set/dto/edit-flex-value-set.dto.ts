import { IsOptional, IsString, IsNumber } from 'class-validator';

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
}