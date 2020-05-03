import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { StockInProcessingDetails } from 'src/entities/stock-in-processing-details.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MarkAsProcessedDto } from 'src/dtos/mark-as-processed.dto';
import { ProcessedCurrentStockDetailsEntity } from 'src/entities/processd-stock-details.entity';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class ProcessingService {
    constructor(
        @InjectRepository(StockInProcessingDetails) private readonly inProcessingRepo : Repository<StockInProcessingDetails>,
        @InjectRepository(ProcessedCurrentStockDetailsEntity) private readonly processedStockRepo : Repository<ProcessedCurrentStockDetailsEntity>,
        private readonly manager: EntityManager
    ){

    }
    async getStockInProcessing() {
        try{
        return await this.manager.query(`select 
        jsonb_build_object('id',c.c_id ,'commodityName',c.c_name ) as "commodity",
        jsonb_build_object('id',s.sc_id ,'subCommodityName',s.sc_name,'CommodityId',s.com_id ) as "subCommodity",
        json_agg(jsonb_build_object('id',sup.s_id , 'suplierName',sup.s_name,'current_stock_id',ucs.unpcsd_id,'weight',sipd.quantity )) as "supplierList",
        sum(coalesce(sipd.quantity)) as weight,
        round(avg(i_s.price),2) as "avgPrice",
        jsonb_agg(sipd.id) as "processingIds" 
        from unjhastockmanagement.stock_in_processing_details sipd 
        left join unjhastockmanagement.inward_stocks i_s on i_s.ins_id = sipd.inward_stock_id 
        left join unjhastockmanagement.commodity c on c.c_id = sipd.c_id 
        left join unjhastockmanagement.sub_commodity  s on s.sc_id  = sipd.sc_id
        left join unjhastockmanagement.suppliers sup on sup.s_id = sipd.s_id 
        left join unjhastockmanagement.unprocessed_current_stock_details ucs on ucs.unpcsd_id = sipd.unprocessed_current_stock_id 
        where sipd.is_active = 1
        group by c.c_id,s.sc_id 
        ;`);
        }catch (err) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async MarkAsProcessed(details:MarkAsProcessedDto){
        try{
            details.qualityWiseWeight.forEach(async(quality)=>{
                let  pcs:ProcessedCurrentStockDetailsEntity ;
                pcs.IncomingDateTime = new Date();
                pcs.CreatedDateTime = new Date();
                pcs.UpdateDateTime = new Date();
                pcs.QuantityInKg = quality.weight;
                pcs.QualityType = quality.qualityType;
                await this.processedStockRepo.save(pcs);    
            })
            this.inProcessingRepo.update(details.processingIds,{isActive: 0});
        }catch (err) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
