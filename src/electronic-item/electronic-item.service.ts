import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { buildQueryFilter } from '../common/utils/mongo-query.helper';
import { RecordStatus } from '../constants/status.constants';
import { ElectronicCategory } from '../electronic-category/entities/electronic-category.schema';
import { CreateElectronicItemDto } from './dto/create-electronic-item.dto';
import { ElectronicItem } from './entities/electronic-item.schema';

@Injectable()
export class ElectronicItemService {
  constructor(
    @InjectModel(ElectronicItem.name)
    private readonly electronicItemModel: Model<ElectronicItem>,
    @InjectModel(ElectronicCategory.name)
    private readonly electronicCategoryModel: Model<ElectronicCategory>,
  ) {}

  async create(
    createElectronicItemDto: CreateElectronicItemDto,
  ): Promise<ElectronicItem> {
    const { code, category: categoryId } = createElectronicItemDto;

    const [existingItem, category] = await Promise.all([
      this.electronicItemModel.findOne({ code }).exec(),
      this.electronicCategoryModel.findById(categoryId).exec(),
    ]);

    if (existingItem) {
      throw new ConflictException(`Linh kiện với mã "${code}" đã tồn tại.`);
    }

    if (!category) {
      throw new BadRequestException(
        `Danh mục với ID "${categoryId}" không tồn tại.`,
      );
    }

    const newItem = new this.electronicItemModel({
      ...createElectronicItemDto,
      currentStock: createElectronicItemDto.quantity || 0,
    });

    return newItem.save();
  }

  async findAll(queryParams: Record<string, any>) {
    // Gán giá trị mặc định và chuyển đổi kiểu cho phân trang, sắp xếp
    const page = Math.max(1, Number(queryParams.page) || 1);
    const limit = Math.max(1, Number(queryParams.limit) || 10);
    const sortBy = queryParams.sortBy as string;
    const sortOrder = queryParams.sortOrder as 'asc' | 'desc' | undefined;
    const skip = (page - 1) * limit;

    // Xây dựng điều kiện lọc từ các tham số query bằng hàm tiện ích
    const searchableFields = ['name', 'code', 'brand'];
    const baseFilter = buildQueryFilter<ElectronicItem>(
      queryParams,
      searchableFields,
    );

    // Kết hợp với điều kiện lọc cố định (ví dụ: status)
    const filter: FilterQuery<ElectronicItem> = {
      ...baseFilter,
      status: RecordStatus.ACTIVE,
    };

    // Xây dựng điều kiện sắp xếp
    const sort: { [key: string]: 1 | -1 } = {};
    if (sortBy && ['asc', 'desc'].includes(String(sortOrder))) {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    } else {
      // Mặc định sắp xếp theo thời gian tạo mới nhất
      sort['createdAt'] = -1;
    }

    const [data, total] = await Promise.all([
      this.electronicItemModel
        .find(filter)
        .select('name code  currentStock')
        .populate('category', 'name') // Populate để lấy tên của danh mục
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.electronicItemModel.countDocuments(filter),
    ]);

    return {
      message: 'Lấy danh sách linh kiện thành công!',
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        query: queryParams,
      },
    };
  }

  async findOne(id: string): Promise<ElectronicItem> {
    const item = await this.electronicItemModel
      .findById(id)
      .populate('category', 'name')
      .lean()
      .exec();

    if (!item) {
      throw new BadRequestException(`Linh kiện với ID "${id}" không tồn tại.`);
    }

    return item;
  }
}
