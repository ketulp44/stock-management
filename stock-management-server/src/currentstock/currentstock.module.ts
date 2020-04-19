import { CurrentStockEntity } from './../entities/current-stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CurrentStockController } from './currentstock.controller';
import { CurrentStockService } from './currentstock.service';

@Module({
  imports: [TypeOrmModule.forFeature([CurrentStockEntity])],
  controllers: [CurrentStockController],
  providers: [CurrentStockService],
  exports: [CurrentStockService]
})
export class CurrentStockModule { }
