import { Test, TestingModule } from '@nestjs/testing';
import { ElectronicItemService } from './electronic-item.service';

describe('ElectronicItemService', () => {
  let service: ElectronicItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectronicItemService],
    }).compile();

    service = module.get<ElectronicItemService>(ElectronicItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
