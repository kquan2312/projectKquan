import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ElectronicCategory,
  ElectronicCategorySchema,
} from '../electronic-category/entities/electronic-category.schema';
import { ElectronicItemController } from './electronic-item.controller';
import { ElectronicItemService } from './electronic-item.service';
import {
  ElectronicItem,
  ElectronicItemSchema,
} from './entities/electronic-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ElectronicItem.name, schema: ElectronicItemSchema },
      { name: ElectronicCategory.name, schema: ElectronicCategorySchema },
    ]),
  ],
  controllers: [ElectronicItemController],
  providers: [ElectronicItemService],
})
export class ElectronicItemModule {}
