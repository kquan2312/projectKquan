import { PartialType } from '@nestjs/mapped-types';
import { CreateFilemanagerDto } from './create-filemanager.dto';

export class UpdateFilemanagerDto extends PartialType(CreateFilemanagerDto) {}
