import { Test, TestingModule } from '@nestjs/testing';
import { CurrentstockController } from './currentstock.controller';

describe('Currentstock Controller', () => {
  let controller: CurrentstockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrentstockController],
    }).compile();

    controller = module.get<CurrentstockController>(CurrentstockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
