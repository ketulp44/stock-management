import { SubCommodity } from 'src/entities/sub-commodity.entity';
import { Commodity } from './../entities/commodity.entity';
import { InwardStock } from './../entities/inward-stock.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InwardStockService {
    constructor(@InjectRepository(InwardStock)
    private readonly InwardStockRepository: Repository<InwardStock>) {

    }

    public async getInwardStocks() {
        return await this.InwardStockRepository
            .createQueryBuilder("inward_stock")
            .leftJoinAndMapOne("inward_stock.Commodity", Commodity, "commodity", "commodity.CommodityID = inward_stock.CommodityId")
            .leftJoinAndMapOne("inward_stock.subCommodity", SubCommodity, "sub_commodity", "sub_commodity.SubCommodityID = inward_stock.SubCommodityId")
            .select(['inward_stock'])
            .addSelect(['commodity.CommodityID','commodity.CommodityName'])
            .addSelect(['sub_commodity.SubCommodityID','sub_commodity.SubCommodityName'])
            .getMany();
    }

    public async getInwardStockById(id: number) {
        return await this.InwardStockRepository.findOne(id);
    }

    public async Save(inwardStock: InwardStock) {
        let result;
        if (Number(inwardStock.InwardStockId) > 0) {
            result = await this.UpdateInwardStock(inwardStock);
        } else {
            result = await this.createNewInwardStock(inwardStock);
        }
        return result;
    }

    public async createNewInwardStock(inwardStock: InwardStock) {
        inwardStock.CreatedDateTime = new Date();
        inwardStock.UpdateDateTime = new Date();
        return await this.InwardStockRepository.insert(inwardStock);
    }

    public async UpdateInwardStock(inwardStock: InwardStock) {
        inwardStock.UpdateDateTime = new Date();
        return await this.InwardStockRepository.update(inwardStock.InwardStockId, inwardStock);
    }




}
