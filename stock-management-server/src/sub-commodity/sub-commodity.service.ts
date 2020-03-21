import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCommodity } from 'src/entities/sub-commodity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubCommodityService {

    constructor(@InjectRepository(SubCommodity)
    private readonly SubCommodityRepository: Repository<SubCommodity>, ) {
    }

    public async getSubCommodities() {
        return await this.SubCommodityRepository.find({ where: [{ IsActive: 1 }] });
    }

    public async getSubCommoditiesByCommodityId(CommodityId: number) {
        return await this.SubCommodityRepository.find({ where: [{ IsActive: 1, CommodityId: CommodityId }] });
    }

    public async getSubCommoditiesById(id: number) {
        return await this.SubCommodityRepository.findOne(id);
    }

    public async Save(subCommodity: SubCommodity) {
        let result;
        if (Number(subCommodity.SubCommodityID) > 0) {
            result = await this.UpdateSubCommodity(subCommodity);
        } else {
            result = await this.createNewSubCommodity(subCommodity);
        }
        return result;
    }

    public async createNewSubCommodity(subCommodity: SubCommodity) {
        subCommodity.CreatedDateTime = new Date();
        subCommodity.UpdateDateTime = new Date();
        return await this.SubCommodityRepository.insert(subCommodity);
    }

    public async UpdateSubCommodity(subCommodity: SubCommodity) {
        subCommodity.UpdateDateTime = new Date();
        return await this.SubCommodityRepository.update(subCommodity.SubCommodityID, subCommodity);
    }



}
