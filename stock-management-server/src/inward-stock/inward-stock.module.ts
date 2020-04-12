import { Commodity } from './../entities/commodity.entity';
import { InwardStock } from './../entities/inward-stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InwardStockService } from './inward-stock.service';
import { InwardStockController } from './inward-stock.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InwardStock, Commodity])],
  providers: [InwardStockService],
  controllers: [InwardStockController]
})
export class InwardStockModule { }
