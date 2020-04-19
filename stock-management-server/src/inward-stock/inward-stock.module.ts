import { CurrentStockService } from './../currentstock/currentstock.service';
import { NotProcessedCurrentStockDetailsEntity } from './../entities/not-processed-stock-details.entity';
import { Commodity } from './../entities/commodity.entity';
import { InwardStock } from './../entities/inward-stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InwardStockService } from './inward-stock.service';
import { InwardStockController } from './inward-stock.controller';
import { ProcessedCurrentStockDetailsEntity } from './../entities/processd-stock-details.entity';
import { CurrentStockModule } from 'src/currentstock/currentstock.module';
import { CurrentStockEntity } from 'src/entities/current-stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      InwardStock,
      Commodity,
      ProcessedCurrentStockDetailsEntity,
      NotProcessedCurrentStockDetailsEntity,
      CurrentStockEntity
    ]
  )],
  providers: [InwardStockService,CurrentStockService],
  controllers: [InwardStockController]
})
export class InwardStockModule { }
