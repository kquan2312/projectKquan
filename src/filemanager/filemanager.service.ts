import { Injectable } from '@nestjs/common';
import { CreateFilemanagerDto } from './dto/create-filemanager.dto';
import { UpdateFilemanagerDto } from './dto/update-filemanager.dto';

@Injectable()
export class FilemanagerService {
  create(createFilemanagerDto: CreateFilemanagerDto) {
    return 'This action adds a new filemanager';
  }

  findAll() {
    return `This action returns all filemanager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filemanager`;
  }

  update(id: number, updateFilemanagerDto: UpdateFilemanagerDto) {
    return `This action updates a #${id} filemanager`;
  }

  remove(id: number) {
    return `This action removes a #${id} filemanager`;
  }
}
