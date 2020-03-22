import { Test, TestingModule } from '@nestjs/testing';
import { InwardStockService } from './inward-stock.service';

describe('InwardStockService', () => {
  let service: InwardStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InwardStockService],
    }).compile();

    service = module.get<InwardStockService>(InwardStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
