import { Module } from '@nestjs/common';
import { ElectronicCategoryService } from './electronic-category.service';
import { ElectronicCategoryController } from './electronic-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ElectronicCategory,
  ElectronicCategorySchema,
} from './entities/electronic-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ElectronicCategory.name, schema: ElectronicCategorySchema },
    ]),
  ],
  controllers: [ElectronicCategoryController],
  providers: [ElectronicCategoryService],
})
export class ElectronicCategoryModule {}
