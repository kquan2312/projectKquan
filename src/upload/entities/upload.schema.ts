import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UploadFile extends Document {
  @Prop({ required: true })
  originalname: string; // Tên file gốc

  @Prop({ required: true })
  filename: string; // Tên file đã được đổi tên trên server

  @Prop({ required: true })
  path: string; // Đường dẫn lưu file trên server

  @Prop({ required: true })
  mimetype: string; // Kiểu file (e.g., 'image/png')

  @Prop({ required: true })
  size: number; // Kích thước file (bytes)
}

export const UploadFileSchema = SchemaFactory.createForClass(UploadFile);
