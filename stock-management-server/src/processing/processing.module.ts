import { Module } from '@nestjs/common';
import { ProcessingController } from './processing.controller';
import { ProcessingService } from './processing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockInProcessingDetails } from 'src/entities/stock-in-processing-details.entity';
import { ProcessedCurrentStockDetailsEntity } from 'src/entities/processd-stock-details.entity';


@Module({
  controllers: [ProcessingController],
  providers: [ProcessingService],
  imports:[
    TypeOrmModule.forFeature([
      StockInProcessingDetails,
      ProcessedCurrentStockDetailsEntity
    ])
  ]
})
export class ProcessingModule {}
