import { Test, TestingModule } from '@nestjs/testing';
import { ElectronicCategoryService } from './electronic-category.service';

describe('ElectronicCategoryService', () => {
  let service: ElectronicCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectronicCategoryService],
    }).compile();

    service = module.get<ElectronicCategoryService>(ElectronicCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
