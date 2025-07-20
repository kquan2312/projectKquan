import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadService } from './upload.service';

@Controller('upload')
@UseGuards(JwtAuthGuard) // Bảo vệ endpoint, chỉ user đã đăng nhập mới được upload
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // 'file' là tên field trong form-data
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required.');
    }

    const savedFile = await this.uploadService.saveFileMetadata(file);

    // Tạo URL để có thể truy cập file sau này
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    // Đường dẫn file từ multer có dạng 'public/uploads/filename.ext'
    // Cần loại bỏ phần 'public/' để URL đúng với cấu hình static asset
    const relativePath = file.path.replace(/\\/g, '/').replace('public/', '');
    const fileAccessUrl = `${baseUrl}/${relativePath}`;

    return {
      message: 'File uploaded successfully',
      data: {
        url: fileAccessUrl,
        ...savedFile.toObject(),
      },
    };
  }
}
