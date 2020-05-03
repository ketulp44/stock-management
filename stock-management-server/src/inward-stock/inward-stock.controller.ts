import { InwardStock } from './../entities/inward-stock.entity';
import { InwardStockService } from './inward-stock.service';
import { Controller, Body, Param, Get, Post } from '@nestjs/common';

@Controller('inward-stock')
export class InwardStockController {

    constructor(private readonly inwardStockService: InwardStockService) { }

    @Get('all')
    public async getInwardStocks() {
        return await this.inwardStockService.getInwardStocks();
    }

    @Get(':id')
    public async getInwardStockById(@Param('id') inwardStockId: number) {
        return await this.inwardStockService.getInwardStockById(inwardStockId);
    }


    @Post()
    public async saveInwardStock(@Body() inwardStock: InwardStock) {
        return await this.inwardStockService.Save(inwardStock);
    }

}
