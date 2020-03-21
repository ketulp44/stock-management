import { Commodity } from './../entities/commodity.entity';
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CommodityService } from './commodity.service';

@Controller('commodity')
export class CommodityController {

    constructor(private readonly commodityService: CommodityService) { }

    @Get('all')
    public async getCommodities() {
        return await this.commodityService.getCommodities();
    }

    @Get(':id')
    public async getSuppliersById(@Param('id') supplierId: number) {
        return await this.commodityService.getCommodityById(supplierId);
    }


    @Post()
    public async createSupplier(@Body() supplier: Commodity) {
        return await this.commodityService.Save(supplier);
    }


}
