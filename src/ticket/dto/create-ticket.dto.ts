import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { TicketStatus, TypeTicket } from '../../constants/status.constants';

export class CreateTicketDto {
  @IsString({ message: 'Tên sự kiện phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên Phiếu không được để trống' })
  @MinLength(3, { message: 'Tên sự kiện phải có ít nhất 3 ký tự' })
  name: string;

  @IsArray({ message: 'Danh sách thiết bị phải là một mảng' })
  @IsNotEmpty({ message: 'Danh sách thiết bị không được để trống' })
  @IsMongoId({ each: true, message: 'Mỗi ID thiết bị phải là MongoId hợp lệ' })
  listItems: Types.ObjectId[];

  @IsArray({ message: 'Danh sách người nhận phải là một mảng' })
  @IsNotEmpty({ message: 'Phải có ít nhất một người nhận' })
  @IsMongoId({
    each: true,
    message: 'Mỗi ID người nhận phải là MongoId hợp lệ',
  })
  receiver: Types.ObjectId[];

  @IsDateString({}, { message: 'Ngày Phiếu phải là định dạng ngày hợp lệ' })
  @IsNotEmpty({ message: 'Ngày Phiếu không được để trống' })
  eventDate: Date;

  @IsDateString({}, { message: 'Ngày xử lý phải là định dạng ngày hợp lệ' })
  @IsNotEmpty({ message: 'Ngày xử lý không được để trống' })
  processStatus: Date;

  @IsEnum(TypeTicket, {
    message:
      'Loại phiếu không hợp lệ. Giá trị phải là một trong các chuỗi: ' +
      Object.values(TypeTicket).join(', '),
  })
  @IsNotEmpty({ message: 'Loại phiếu không được để trống' })
  typeTicket: TypeTicket;

  @IsString()
  @IsOptional()
  note?: string;

  @IsEnum(TicketStatus, {
    message:
      'Trạng thái phiếu không hợp lệ. Giá trị phải là một trong các số: ' +
      Object.values(TicketStatus)
        .filter((v) => typeof v === 'number')
        .join(', '),
  })
  @IsNumber({}, { message: 'Trạng thái phiếu phải là một số' })
  @IsOptional()
  statusTicket?: TicketStatus;
}
