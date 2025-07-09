import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateElectronicItemDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId({ message: 'Category phải là một MongoID hợp lệ.' })
  @IsNotEmpty()
  category: string; // ID của ElectronicCategory

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  specification?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsDateString()
  @IsOptional()
  importDate?: Date;

  @IsDateString()
  @IsOptional()
  warrantyExpireDate?: Date;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity?: number;
}
