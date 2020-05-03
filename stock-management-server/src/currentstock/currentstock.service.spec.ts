import { Test, TestingModule } from '@nestjs/testing';
import { CurrentstockService } from './currentstock.service';

describe('CurrentstockService', () => {
  let service: CurrentstockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrentstockService],
    }).compile();

    service = module.get<CurrentstockService>(CurrentstockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
