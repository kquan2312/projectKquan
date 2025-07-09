import { Test, TestingModule } from '@nestjs/testing';
import { ElectronicCategoryController } from './electronic-category.controller';
import { ElectronicCategoryService } from './electronic-category.service';

describe('ElectronicCategoryController', () => {
  let controller: ElectronicCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectronicCategoryController],
      providers: [ElectronicCategoryService],
    }).compile();

    controller = module.get<ElectronicCategoryController>(ElectronicCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
