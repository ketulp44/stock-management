import { CurrentStockService } from './currentstock.service';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { SubCommodity } from 'src/entities/sub-commodity.entity';
import { ProcessingStockDto } from 'src/dtos/processing-stock.dto';

@Controller('current-stock')
export class CurrentStockController {

    constructor(private readonly currentStockService: CurrentStockService) { }

    @Get('all')
    public async findCurrentStock() {
        return await this.currentStockService.getCurrentStocks();
    }
    @Get('unprocessed/all/:c_id/:sc_id')
    public async findUnprocessedStock(@Param('c_id') commodityId,@Param('sc_id') SubCommodityId){
        return await this.currentStockService.getUnprocessedStock(commodityId,SubCommodityId);
    }

    @Post('processed/all')
    public async findProcessedStock(@Body() details:any ){
        return await this.currentStockService.getProcessedStock(details.commodityId,details.subCommodityId);
    }

    @Post('addtoprocessing')
    public async addToProcessing(@Body() details:ProcessingStockDto []){
        return await this.currentStockService.addToProcessing(details);
    }


}
