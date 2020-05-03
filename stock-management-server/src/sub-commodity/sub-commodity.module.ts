import { SubCommodity } from './../entities/sub-commodity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SubCommodityService } from './sub-commodity.service';
import { SubCommodityController } from './sub-commodity.controller';

@Module({
  imports:[TypeOrmModule.forFeature([SubCommodity])],
  providers: [SubCommodityService],
  controllers: [SubCommodityController]
})
export class SubCommodityModule {}
