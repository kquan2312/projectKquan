import { PartialType } from '@nestjs/mapped-types';
import { CreateElectronicCategoryDto } from './create-electronic-category.dto';

export class UpdateElectronicCategoryDto extends PartialType(
  CreateElectronicCategoryDto,
) {}
