import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ElectronicCategoryModule } from './electronic-category/electronic-category.module';
import { ElectronicCategorySchema } from './electronic-category/entities/electronic-category.schema';
import { ElectronicItemModule } from './electronic-item/electronic-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Giúp ConfigModule có sẵn ở mọi nơi
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ElectronicCategoryModule,
    ElectronicItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
