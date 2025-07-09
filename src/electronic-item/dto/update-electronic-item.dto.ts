import { PartialType } from '@nestjs/mapped-types';
import { CreateElectronicItemDto } from './create-electronic-item.dto';

export class UpdateElectronicItemDto extends PartialType(
  CreateElectronicItemDto,
) {}
