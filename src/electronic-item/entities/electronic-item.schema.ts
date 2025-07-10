// src/electronic-item/schemas/electronic-item.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RecordStatus, StatusItem } from './../../constants/status.constants';

@Schema({ timestamps: true })
export class ElectronicItem extends Document {
  @Prop({ required: true, unique: true })
  code: string; // Mã thiết bị duy nhất (VD: CPU-I5-001)

  @Prop({ required: true })
  name: string; // Tên thiết bị

  @Prop({ type: Types.ObjectId, ref: 'ElectronicCategory', required: true })
  category: Types.ObjectId; // Loại thiết bị

  @Prop()
  brand: string; // Hãng sản xuất

  @Prop()
  specification: string; // Thông số kỹ thuật

  @Prop({ enum: RecordStatus, default: RecordStatus.ACTIVE })
  status: RecordStatus; // Trạng thái bản ghi (ACTIVE/INACTIVE)

  @Prop({ enum: StatusItem, default: StatusItem.IN_STOCK })
  statusItem: StatusItem; // Trạng thái sử dụng của thiết bị

  @Prop()
  price: number; // Giá thiết bị

  @Prop()
  importDate: Date; // Ngày nhập thiết bị

  @Prop()
  warrantyExpireDate: Date; // Hạn bảo hành

  @Prop()
  location: string; // Vị trí trong kho

  @Prop()
  note: string; // Ghi chú khác
}

export const ElectronicItemSchema =
  SchemaFactory.createForClass(ElectronicItem);
