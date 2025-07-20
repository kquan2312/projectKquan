import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  RecordStatus,
  StatusItem,
  TicketStatus,
  TypeTicket,
} from './../../constants/status.constants';

@Schema({ timestamps: true })
export class Ticket extends Document {
  @Prop({ required: true, unique: true })
  code: string; // Mã phiếu duy nhất (VD: TICKET-001)

  @Prop({ required: true })
  name: string; // Tên Phiếu

  @Prop({ type: [Types.ObjectId], ref: 'ElectronicItem', required: true })
  listItems: Types.ObjectId[]; // ds thiết bị thuộc phiếu

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId; // Người giao, lấy người đang login

  @Prop({ type: [Types.ObjectId], ref: 'User', required: true })
  receiver: Types.ObjectId[]; // người nhận việc

  @Prop({ type: Date, required: true })
  eventDate: Date; // Ngày tạo phiếu

  @Prop({ type: Date, required: true })
  processStatus: Date; //hạn xử lý

  @Prop({ enum: RecordStatus, default: RecordStatus.ACTIVE })
  status: number; // Trạng bản ghi

  @Prop({ enum: TicketStatus, default: TicketStatus.NEW })
  statusTicket: number; // Trạng thái phiếu

  @Prop({ required: true, enum: TypeTicket })
  typeTicket: TypeTicket; // Loại vé (nếu có)

  @Prop()
  note: string; // Ghi chú khác

  @Prop({ type: [Types.ObjectId], ref: 'UploadFile', default: [] })
  files: Types.ObjectId[];
}
export const TicketSchema = SchemaFactory.createForClass(Ticket);
