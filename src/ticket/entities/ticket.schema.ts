import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RecordStatus, StatusItem } from './../../constants/status.constants';

@Schema({ timestamps: true })
export class Ticket extends Document {
  @Prop({ required: true, unique: true })
  code: string; // Mã vé duy nhất (VD: TICKET-001)

  @Prop({ required: true })
  name: string; // Tên sự kiện

  @Prop({ type: [Types.ObjectId], ref: 'ElectronicItem', required: true })
  listItems: Types.ObjectId[]; // ds thiết bị thuộc phiếu

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId; // Người giao

  @Prop({ type: [Types.ObjectId], ref: 'User', required: true })
  receiver: Types.ObjectId[]; // người nhận

  @Prop({ type: Date, required: true })
  eventDate: Date; // Ngày diễn ra sự kiện

  @Prop({ type: Date, required: true })
  processStatus: Date; // Ngày diễn ra sự kiện

  @Prop({ enum: RecordStatus, default: RecordStatus.ACTIVE })
  status: number; // Trạng thái vé (ACTIVE/INACTIVE)

  @Prop({ enum: StatusItem })
  statusItem: number; // Trạng thái sử dụng của vé

  @Prop({ required: true })
  typeTicket: string; // Loại vé (nếu có)

  @Prop()
  note: string; // Ghi chú khác

  @Prop({ type: Number, required: false })
  ticketStatus: number; // trạng thái của phiếu dùng để xác định nó ở đâu
}
export const TicketSchema = SchemaFactory.createForClass(Ticket);
