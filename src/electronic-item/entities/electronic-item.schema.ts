// src/electronic-item/schemas/electronic-item.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RecordStatus } from './../../constants/status.constants';

@Schema({ timestamps: true })
export class ElectronicItem extends Document {
  @Prop({ required: true, unique: true })
  code: string; // Mã linh kiện duy nhất

  @Prop({ required: true })
  name: string; // Tên linh kiện

  @Prop({ type: Types.ObjectId, ref: 'ElectronicCategory', required: true })
  category: Types.ObjectId; // Loại linh kiện

  @Prop()
  brand: string; // Hãng sản xuất (VD: Intel, Samsung)

  @Prop()
  specification: string; // Thông số kỹ thuật

  @Prop({ default: 0 })
  currentStock: number; // Số lượng tồn kho

  @Prop({ enum: RecordStatus, default: RecordStatus.ACTIVE })
  status: RecordStatus; // Trạng thái bản ghi (0: Inactive, 1: Active)

  @Prop()
  price: number; // Giá nhập 1 đơn vị

  @Prop()
  importDate: Date; // Ngày nhập

  @Prop()
  warrantyExpireDate: Date; // Hạn bảo hành

  @Prop()
  location: string; // Vị trí lưu kho

  @Prop()
  note: string; // Ghi chú

  //   @Prop()
  //   quantity: number; // Số lượng nhập kho
}

export const ElectronicItemSchema =
  SchemaFactory.createForClass(ElectronicItem);
