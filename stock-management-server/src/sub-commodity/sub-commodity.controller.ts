import { SubCommodity } from './../entities/sub-commodity.entity';
import { SubCommodityService } from './sub-commodity.service';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('sub-commodity')
export class SubCommodityController {

    constructor(private subCommodityService: SubCommodityService) { }

    @Get('all')
    public async getSubCommodities() {
        return await this.subCommodityService.getSubCommodities();
    }

    @Get('commodity-wise/:id')
    public async getSubCommoditiesByCommodityId(@Param('id') commodityId: number) {
        return await this.subCommodityService.getSubCommoditiesByCommodityId(commodityId);
    }

    @Get(':id')
    public async getSubCommoditiesById(@Param('id') subCommodityId: number) {
        return await this.subCommodityService.getSubCommoditiesById(subCommodityId);
    }


    @Post()
    public async saveSubCommodity(@Body() subCommodity: SubCommodity) {
        return await this.subCommodityService.Save(subCommodity);
    }


}
