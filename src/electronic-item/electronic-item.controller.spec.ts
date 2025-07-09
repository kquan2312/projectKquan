import { Test, TestingModule } from '@nestjs/testing';
import { ElectronicItemController } from './electronic-item.controller';
import { ElectronicItemService } from './electronic-item.service';

describe('ElectronicItemController', () => {
  let controller: ElectronicItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectronicItemController],
      providers: [ElectronicItemService],
    }).compile();

    controller = module.get<ElectronicItemController>(ElectronicItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
