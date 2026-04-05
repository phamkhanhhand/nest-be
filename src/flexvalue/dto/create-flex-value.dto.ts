import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateFlexValueDto {

  @IsOptional()
  @IsNumber()
  flexValueSetId?: number;

  @IsOptional()
  @IsString()
  flexValue?: string;

  @IsOptional()
  @IsString()
  flexValueName?: string;

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