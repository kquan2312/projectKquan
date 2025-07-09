import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RecordStatus } from './../../constants/status.constants';

@Schema({ timestamps: true })
export class ElectronicCategory extends Document {
  @Prop({ required: true, unique: true })
  name: string; // Ví dụ: Vi điều khiển, IC, Điện trở

  @Prop()
  description: string; // Mô tả thêm (tùy chọn)

  @Prop({
    enum: RecordStatus,
    default: RecordStatus.ACTIVE,
  })
  status: RecordStatus; // ✔ Dùng đúng kiểu enum
}

export const ElectronicCategorySchema =
  SchemaFactory.createForClass(ElectronicCategory);
