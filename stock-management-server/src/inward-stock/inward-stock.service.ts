import { ProcessType } from './../enums/process-type.enum';
import { NotProcessedCurrentStockDetailsEntity } from './../entities/not-processed-stock-details.entity';
import { ProcessedCurrentStockDetailsEntity } from './../entities/processd-stock-details.entity';
import { isNullOrUndefined } from 'util';
import { WeightUnits } from './../enums/weight.enum';
import { CurrentStockEntity } from './../entities/currenstock.entity';
import { SubCommodity } from 'src/entities/sub-commodity.entity';
import { Commodity } from './../entities/commodity.entity';
import { InwardStock } from './../entities/inward-stock.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InwardStockService {
    constructor(@InjectRepository(InwardStock)
    private readonly InwardStockRepository: Repository<InwardStock>,
        //private readonly CurrentStockRepository: Repository<CurrentStockEntity>,
        @InjectRepository(ProcessedCurrentStockDetailsEntity) private readonly ProcessedCurrentStockRepository: Repository<ProcessedCurrentStockDetailsEntity>,
        @InjectRepository(NotProcessedCurrentStockDetailsEntity) private readonly unProcessedCurrentStockRepository: Repository<NotProcessedCurrentStockDetailsEntity>,
    ) {

    }

    public async getInwardStocks() {
        return await this.InwardStockRepository
            .createQueryBuilder("inward_stock")
            .leftJoinAndMapOne("inward_stock.Commodity", Commodity, "commodity", "commodity.CommodityID = inward_stock.CommodityId")
            .leftJoinAndMapOne("inward_stock.subCommodity", SubCommodity, "sub_commodity", "sub_commodity.SubCommodityID = inward_stock.SubCommodityId")
            .select(['inward_stock'])
            .addSelect(['commodity.CommodityID', 'commodity.CommodityName'])
            .addSelect(['sub_commodity.SubCommodityID', 'sub_commodity.SubCommodityName'])
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
        const result = await this.InwardStockRepository.insert(inwardStock);

        if (inwardStock.ProcessType == ProcessType.processed) {
            await this.SaveProcessStockDetails(inwardStock);
        } else if (inwardStock.ProcessType == ProcessType.unprocessed) {
            await this.SaveUnProcessStockDetails(inwardStock);
        }
        return result;
    }

    public async UpdateInwardStock(inwardStock: InwardStock) {
        inwardStock.UpdateDateTime = new Date();
        const result = await this.InwardStockRepository.update(inwardStock.InwardStockId, inwardStock);
        if (inwardStock.ProcessType == ProcessType.processed) {
            await this.SaveProcessStockDetails(inwardStock);
        } else if (inwardStock.ProcessType == ProcessType.unprocessed) {
            await this.SaveUnProcessStockDetails(inwardStock);
        }
        return result;
    }

    public async SaveProcessStockDetails(inwardStock: InwardStock) {
        const result = await this.ProcessedCurrentStockRepository.findOne({ where: { InwardStockId: inwardStock.InwardStockId } });

        if (result && inwardStock.IsActive > 0) {
            result.IncomingDateTime = inwardStock.IncomingDate;
            result.QuantityInKg = this.convertToKG(inwardStock.NoOfBags * inwardStock.PackageSize, inwardStock.PackageUnit);
            result.UpdateDateTime = new Date();
            await this.ProcessedCurrentStockRepository.update(result.ProcessStockDetailsId, result);

        } else if (result && inwardStock.IsActive <= 0) {
            await this.ProcessedCurrentStockRepository.delete(result);

        } else {
            const processStockDetailEntity: ProcessedCurrentStockDetailsEntity = new ProcessedCurrentStockDetailsEntity();
            processStockDetailEntity.InwardStockId = inwardStock.InwardStockId;
            processStockDetailEntity.IncomingDateTime = inwardStock.IncomingDate;
            processStockDetailEntity.CreatedDateTime = new Date();
            processStockDetailEntity.UpdateDateTime = new Date();
            processStockDetailEntity.QuantityInKg = this.convertToKG(inwardStock.NoOfBags * inwardStock.PackageSize, inwardStock.PackageUnit);
            await this.ProcessedCurrentStockRepository.insert(processStockDetailEntity);
        }
    }

    public async SaveUnProcessStockDetails(inwardStock: InwardStock) {

        const result = await this.unProcessedCurrentStockRepository.findOne({ where: { InwardStockId: inwardStock.InwardStockId } });

        if (result && inwardStock.IsActive > 0) {
            result.IncomingDateTime = inwardStock.IncomingDate;
            result.QuantityInKg = this.convertToKG(inwardStock.NoOfBags * inwardStock.PackageSize, inwardStock.PackageUnit);
            result.UpdateDateTime = new Date();
            await this.unProcessedCurrentStockRepository.update(result.UnProcessStockDetailsId, result);

        } else if (result && inwardStock.IsActive <= 0) {
            await this.unProcessedCurrentStockRepository.delete(result);

        } else {
            const unProcessStockDetailEntity: NotProcessedCurrentStockDetailsEntity = new NotProcessedCurrentStockDetailsEntity();
            unProcessStockDetailEntity.InwardStockId = inwardStock.InwardStockId;
            unProcessStockDetailEntity.IncomingDateTime = inwardStock.IncomingDate;
            unProcessStockDetailEntity.CreatedDateTime = new Date();
            unProcessStockDetailEntity.UpdateDateTime = new Date();
            unProcessStockDetailEntity.QuantityInKg = this.convertToKG(inwardStock.NoOfBags * inwardStock.PackageSize, inwardStock.PackageUnit);
            await this.unProcessedCurrentStockRepository.insert(unProcessStockDetailEntity);
        }
    }


    //     public async ConsolidateCurrentStockBasedOnInwardStock(inwardStock: InwardStock) {

    //         if (inwardStock.ProcessType.startsWith('process')) {
    //             const currentStock = new CurrentStockEntity();

    //             currentStock.CommodityId = inwardStock.CommodityId;
    //             currentStock.SubCommodityId = inwardStock.SubCommodityId;
    //             currentStock.StockPrice = inwardStock.StockPrice;
    //             currentStock.QualityType = inwardStock.QualityType;
    //             currentStock.ProcessType = inwardStock.ProcessType;
    //             currentStock.PackageUnit = 'KILOGRAM';
    //             currentStock.BagSize = this.convertToKG(inwardStock.NoOfBags * inwardStock.PackageSize, inwardStock.PackageUnit);

    //             const existCurrentStock: CurrentStockEntity = await this.CurrentStockRepository.findOne(
    //                 {
    //                     where: [{
    //                         CommodityId: currentStock.CommodityId,
    //                         SubCommodityId: currentStock.SubCommodityId,
    //                         StockPrice: currentStock.StockPrice,
    //                         QualityType: currentStock.QualityType,
    //                         ProcessType: currentStock.ProcessType
    //                     }]
    //                 });

    //             if (!isNullOrUndefined(CurrentStockEntity)) {
    //                 currentStock.CurrentStockId = existCurrentStock.CurrentStockId;
    //                 currentStock.BagSize = 
    //             }

    //         }

    //     }


    private convertToKG(size: number, unit: string): number {
        if (unit == 'kg') {
            return size * WeightUnits.KILOGRAM;
        } else if (unit == 'gram') {
            return size * WeightUnits.GRAM;
        } else if (unit.toLowerCase() == 'quintal') {
            return size * WeightUnits.Quintal;
        } else {
            return size * WeightUnits.Tonne;
        }
    }


}
