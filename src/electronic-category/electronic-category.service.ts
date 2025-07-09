import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateElectronicCategoryDto } from './dto/create-electronic-category.dto';
import { UpdateElectronicCategoryDto } from './dto/update-electronic-category.dto';
import { ElectronicCategory } from './entities/electronic-category.schema';
import { RecordStatus } from '../constants/status.constants';
import { buildQueryFilter } from '../common/utils/mongo-query.helper';

@Injectable()
export class ElectronicCategoryService {
  constructor(
    @InjectModel(ElectronicCategory.name)
    private readonly electronicCategoryModel: Model<ElectronicCategory>,
  ) {}

  async create(
    createElectronicCategoryDto: CreateElectronicCategoryDto,
  ): Promise<ElectronicCategory> {
    const existingCategory = await this.electronicCategoryModel
      .findOne({ name: createElectronicCategoryDto.name })
      .exec();

    if (existingCategory) {
      throw new ConflictException(
        `Danh mục với tên "${createElectronicCategoryDto.name}" đã tồn tại.`,
      );
    }

    const createdCategory = new this.electronicCategoryModel(
      createElectronicCategoryDto,
    );
    return createdCategory.save();
  }

  async findAll(queryParams: Record<string, any>) {
    // Gán giá trị mặc định và chuyển đổi kiểu cho phân trang, sắp xếp
    const page = Math.max(1, Number(queryParams.page) || 1);
    const limit = Math.max(1, Number(queryParams.limit) || 10);
    const sortBy = queryParams.sortBy as string;
    const sortOrder = queryParams.sortOrder as 'asc' | 'desc' | undefined;
    const skip = (page - 1) * limit;

    // Xây dựng điều kiện lọc từ các tham số query bằng hàm tiện ích
    const baseFilter = buildQueryFilter<ElectronicCategory>(queryParams, [
      'name',
    ]);

    // Kết hợp với điều kiện lọc cố định (ví dụ: status)
    const filter: FilterQuery<ElectronicCategory> = {
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
      this.electronicCategoryModel
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.electronicCategoryModel.countDocuments(filter),
    ]);

    return {
      message: 'Lấy danh sách danh mục thành công!',
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

  findOne(id: string) {
    return `This action returns a #${id} electronicCategory`;
  }

  update(id: string, updateElectronicCategoryDto: UpdateElectronicCategoryDto) {
    return `This action updates a #${id} electronicCategory`;
  }

  remove(id: string) {
    return `This action removes a #${id} electronicCategory`;
  }
}
