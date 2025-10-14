import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StatusItem, TicketStatus } from '../constants/status.constants';
import { ElectronicItem } from '../electronic-item/entities/electronic-item.schema';
import { User } from '../users/schemas/user.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.schema';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(ElectronicItem.name)
    private readonly electronicItemModel: Model<ElectronicItem>,
  ) {}

  async create(
    createTicketDto: CreateTicketDto,
    currentUser: any,
  ): Promise<Ticket> {
    const { listItems, receiver } = createTicketDto;

    // 1. Kiểm tra sự tồn tại của người nhận và thiết bị đồng thời
    const [receiversExist, items] = await Promise.all([
      this.userModel.countDocuments({ _id: { $in: receiver } }).exec(),
      this.electronicItemModel
        .find({ _id: { $in: listItems } })
        .select('name code statusItem')
        .exec(),
    ]);

    if (receiversExist !== receiver.length) {
      throw new BadRequestException('Một hoặc nhiều người nhận không tồn tại.');
    }

    if (items.length !== listItems.length) {
      throw new BadRequestException('Một hoặc nhiều thiết bị không hợp lệ.');
    }

    // 2. Kiểm tra trạng thái của từng thiết bị
    const unavailableItems = items.filter(
      (item) =>
        item.statusItem === StatusItem.OUT_OF_STOCK ||
        item.statusItem === StatusItem.UNDER_MAINTENANCE,
    );

    if (unavailableItems.length > 0) {
      const itemDetails = unavailableItems
        .map((item) => `${item.name} (${item.code})`)
        .join(', ');
      throw new BadRequestException(
        `Các thiết bị sau không có sẵn hoặc đang được bảo trì: ${itemDetails}.`,
      );
    }

    // 3. Tạo mã phiếu mới tự động tăng
    const lastTicket = await this.ticketModel
      .findOne({}, {}, { sort: { code: -1 } }) // Sắp xếp theo mã để lấy mã lớn nhất
      .exec();

    let newCode = 'TICKET-001';
    if (lastTicket && lastTicket.code) {
      const lastCodeNumber = parseInt(lastTicket.code.split('-')[1], 10);
      newCode = `TICKET-${('000' + (lastCodeNumber + 1)).slice(-3)}`;
    }

    // 4. Kiểm tra và lấy ID người dùng từ token đã được xác thực
    if (!currentUser || !currentUser.sub) {
      // Lỗi này không nên xảy ra nếu JwtAuthGuard hoạt động đúng
      throw new InternalServerErrorException(
        'Không thể xác định người dùng từ token. Vui lòng đăng nhập lại.',
      );
    }

    // 5. Tạo và lưu phiếu mới
    const createdTicket = new this.ticketModel({
      ...createTicketDto,
      code: newCode,
      user: currentUser.sub, // Gán trực tiếp ID người dùng, Mongoose sẽ tự cast sang ObjectId
    });

    return createdTicket.save();
  }

  async findAll(
    user: any,
    query?: { receiver?: string; page?: string; limit?: string },
  ) {
    const userId = user.sub;

    const page = Math.max(1, Number(query?.page) || 1);
    const limit = Math.max(1, Number(query?.limit) || 10);
    const skip = (page - 1) * limit;

    // 1. Base filter: Đảm bảo người dùng chỉ có thể thấy các phiếu
    // mà họ đã tạo hoặc họ là người nhận.
    const baseFilter = {
      $or: [
        { user: userId }, // Người dùng là người tạo phiếu
        { receiver: userId }, // Người dùng có trong danh sách người nhận
      ],
    };

    // 2. Search filter: Xây dựng bộ lọc từ các tham số query
    const searchFilter = {};
    if (query?.receiver) {
      if (!Types.ObjectId.isValid(query.receiver)) {
        throw new BadRequestException(
          'ID người nhận trong bộ lọc không hợp lệ.',
        );
      }
      // Thêm điều kiện lọc theo người nhận
      searchFilter['receiver'] = query.receiver;
    }
    // Bạn có thể dễ dàng mở rộng để thêm các bộ lọc khác ở đây
    // ví dụ: if (query.status) { searchFilter['statusTicket'] = query.status; }

    // 3. Combine filters: Kết hợp bộ lọc quyền và bộ lọc tìm kiếm
    const finalFilter = {
      $and: [baseFilter, searchFilter],
    };

    const [data, total] = await Promise.all([
      this.ticketModel
        .find(finalFilter)
        .populate('listItems', 'name code brand')
        .populate('user', ' username ')
        .populate('receiver', ' username ')
        .populate('files', 'filename url')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.ticketModel.countDocuments(finalFilter),
    ]);

    return {
      message: 'Lấy danh sách phiếu thành công!',
      data,
      filter: finalFilter,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel
      .findById(id)

      .populate('listItems', 'name code') // ← chỉ populate các field name, code chẳng hạn
      .populate('user', 'fullName username') // nếu bạn cũng muốn lấy tên user
      .populate('receiver', 'fullName username') // nếu receiver là user khác
      .exec();
    if (!ticket) {
      throw new ConflictException('Phiếu không tồn tại');
    }
    return ticket;
  }

  update(id: string, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: string) {
    return `This action removes a #${id} ticket`;
  }
}
