import { CurrentStockEntity } from './../entities/current-stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CurrentStockController } from './currentstock.controller';
import { CurrentStockService } from './currentstock.service';
import { StockInProcessingDetails } from 'src/entities/stock-in-processing-details.entity';
import { NotProcessedCurrentStockDetailsEntity } from 'src/entities/not-processed-stock-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      CurrentStockEntity,
      StockInProcessingDetails,
      NotProcessedCurrentStockDetailsEntity
    ])],
  controllers: [CurrentStockController],
  providers: [CurrentStockService],
  exports: [CurrentStockService]
})
export class CurrentStockModule { }
