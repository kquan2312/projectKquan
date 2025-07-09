import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { RecordStatus } from '../../constants/status.constants';

export type UserDocument = User & Document;

@Schema({ timestamps: true }) // Tự động thêm createdAt và updatedAt
export class User {
  @Prop({ required: true, unique: true, trim: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true, trim: true })
  email: string;

  //   Bạn có thể thêm các trường khác ở đây
  @Prop()
  fullName: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ type: Number, enum: RecordStatus, default: RecordStatus.ACTIVE })
  status: RecordStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Middleware (pre-save hook) để hash mật khẩu trước khi lưu
UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
