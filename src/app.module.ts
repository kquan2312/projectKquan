import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ElectronicCategoryModule } from './electronic-category/electronic-category.module';
import { ElectronicItemModule } from './electronic-item/electronic-item.module';
import { TicketModule } from './ticket/ticket.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/kquandb'),
    ConfigModule.forRoot({
      isGlobal: true, // Làm cho ConfigModule khả dụng toàn cục
    }),
    UsersModule,
    AuthModule,
    ElectronicCategoryModule,
    ElectronicItemModule,
    TicketModule,
    UploadModule, // Thêm UploadModule vào đây
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
