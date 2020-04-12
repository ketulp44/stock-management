import { Test, TestingModule } from '@nestjs/testing';
import { InwardStockController } from './inward-stock.controller';

describe('InwardStock Controller', () => {
  let controller: InwardStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InwardStockController],
    }).compile();

    controller = module.get<InwardStockController>(InwardStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
