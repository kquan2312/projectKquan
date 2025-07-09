import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateElectronicCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
