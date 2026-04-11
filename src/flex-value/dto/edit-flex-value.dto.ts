import { IsOptional, IsString, IsNumber } from 'class-validator';
import { BaseEntityDto } from 'src/shared/dto/baseEntity.dto';

export class EditFlexValueDto extends BaseEntityDto {

  @IsOptional()
  @IsNumber()
  flexValueSetId?: number;

  @IsNumber()
  flexValueId?: number;
  
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