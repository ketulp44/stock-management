import { Commodity } from './../entities/commodity.entity';
import { Module } from '@nestjs/common';
import { CommodityService } from './commodity.service';
import { CommodityController } from './commodity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Commodity])],
  providers: [CommodityService],
  controllers: [CommodityController]
})
export class CommodityModule { }
