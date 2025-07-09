import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
      const newUser = await this.usersService.create(registerUserDto);

      // Sau khi đăng ký thành công, tự động đăng nhập và tạo token
      const payload = { username: newUser.username, sub: newUser._id };
      const accessToken = this.jwtService.sign(payload);

      // Chuẩn bị dữ liệu người dùng để trả về (loại bỏ mật khẩu)
      const { password, ...userResult } = newUser.toObject();

      return {
        message: 'Đăng ký thành công!',
        user: userResult,
        access_token: accessToken,
      };
    } catch (error) {
      // Bắt lỗi duplicate key (username/email đã tồn tại)
      if (error.code === 11000) {
        throw new ConflictException('Username hoặc Email đã tồn tại.');
      }
      throw error;
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    // So sánh mật khẩu người dùng nhập với mật khẩu đã hash trong DB
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toObject() as Record<
        string,
        unknown
      >;
      return result;
    }
    return null;
  }

  async login(user: { username: string; _id: string }) {
    const payload = { username: user.username, sub: user._id };
    return {
      message: 'Đăng nhập thành công!',
      access_token: this.jwtService.sign(payload),
    };
  }
}
