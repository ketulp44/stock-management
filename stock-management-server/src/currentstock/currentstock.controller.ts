import { CurrentStockService } from './currentstock.service';
import { Controller, Get } from '@nestjs/common';

@Controller('current-stock')
export class CurrentStockController {

    constructor(private readonly currentStockService: CurrentStockService) { }

    @Get('all')
    public async findCurrentStock() {
        return await this.currentStockService.getCurrentStocks();
    }

}
