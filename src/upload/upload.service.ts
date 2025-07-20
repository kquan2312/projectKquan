import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadFile } from './entities/upload.schema';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(UploadFile.name)
    private readonly uploadFileModel: Model<UploadFile>,
  ) {}

  async saveFileMetadata(file: Express.Multer.File): Promise<UploadFile> {
    const newFile = new this.uploadFileModel({ ...file });
    return newFile.save();
  }
}
