import { Test, TestingModule } from '@nestjs/testing';
import { SubCommodityController } from './sub-commodity.controller';

describe('SubCommodity Controller', () => {
  let controller: SubCommodityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubCommodityController],
    }).compile();

    controller = module.get<SubCommodityController>(SubCommodityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
