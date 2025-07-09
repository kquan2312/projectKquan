import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Tìm một user dựa trên username.
   * Lấy cả mật khẩu để phục vụ cho việc xác thực.
   */
  async findOne(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).select('+password').exec();
  }

  /**
   * Tạo một user mới.
   * Mật khẩu sẽ được hash tự động bởi pre-save hook trong schema.
   */
  async create(registerUserDto: RegisterUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(registerUserDto);
    return createdUser.save();
  }

  /**
   * Lấy tất cả người dùng.
   * Không trả về mật khẩu.
   */
  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().select('-password').exec();
  }
}
