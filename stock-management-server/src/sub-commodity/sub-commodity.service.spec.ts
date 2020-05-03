import { Test, TestingModule } from '@nestjs/testing';
import { SubCommodityService } from './sub-commodity.service';

describe('SubCommodityService', () => {
  let service: SubCommodityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubCommodityService],
    }).compile();

    service = module.get<SubCommodityService>(SubCommodityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
