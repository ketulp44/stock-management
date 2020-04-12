import { SubCommodity } from '../entities/sub-commodity.entity';
import { Commodity } from './../entities/commodity.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommodityService {

    constructor(@InjectRepository(Commodity)
    private readonly CommodityRepository: Repository<Commodity>, ) {

    }

    public async getCommodities() {
        return await this.CommodityRepository.find({ where: [{ IsActive: 1 }] });
    }

    public async getCommodityById(id: number) {
        return await this.CommodityRepository.findOne(id);
    }

    public async getCommoditiesWithSubCommodities() {
        return await this.CommodityRepository.createQueryBuilder('commodity')
        .leftJoinAndMapMany('commodity.SubCommodities',SubCommodity,'sub_commodity',"commodity.CommodityID = sub_commodity.CommodityId")
        .getMany();
    }

    public async Save(commodity: Commodity) {
        let result;
        if (Number(commodity.CommodityID) > 0) {
            result = await this.UpdateCommodity(commodity);
        } else {
            result = await this.createNewCommodity(commodity);
        }
        return result;
    }

    public async createNewCommodity(commodity: Commodity) {
        commodity.CreatedDateTime = new Date();
        commodity.UpdateDateTime = new Date();
        return await this.CommodityRepository.insert(commodity);
    }

    public async UpdateCommodity(commodity: Commodity) {
        commodity.UpdateDateTime = new Date();
        return await this.CommodityRepository.update(commodity.CommodityID, commodity);
    }

}
