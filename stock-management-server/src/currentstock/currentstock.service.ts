import { CurrentStockEntity } from './../entities/current-stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, EntityManager, getManager, getConnection, QueryFailedError } from 'typeorm';
import { StockInProcessingDetails } from './../entities/stock-in-processing-details.entity';
import { ProcessingStockDto } from 'src/dtos/processing-stock.dto';
import { NotProcessedCurrentStockDetailsEntity } from './../entities/not-processed-stock-details.entity';
import { async } from 'rxjs/internal/scheduler/async';
import { SubCommodity } from 'src/entities/sub-commodity.entity';

@Injectable()
export class CurrentStockService {


    constructor
        (
            @InjectRepository(CurrentStockEntity)
            private readonly currentStockEntity: Repository<CurrentStockEntity>,
            @InjectRepository(NotProcessedCurrentStockDetailsEntity) private readonly unProcessedCurrentStockRepository: Repository<NotProcessedCurrentStockDetailsEntity>,
            @InjectRepository(StockInProcessingDetails) private readonly inProcessingRepo : Repository<StockInProcessingDetails>,
            private readonly manager: EntityManager) {
        this.manager = getManager();
    }


    public async CurrentStockEntry() {
        try {
            await this.manager.query(`SET search_path TO ${process.env.TYPEORM_SCHEMA};`);
            await this.manager.query(`call stock_consolidation();`);
            const res = await this.manager.query(`select * from current_stocks;`);
            return 'success';
        } catch (err) {
            return 'failed';
            throw err;
        }
    }

    public async getCurrentStocks() {
        return this.manager.query(`select
        jsonb_build_object('id' , c.c_id ,'name',c.c_name ) as commodity,
        jsonb_build_object('id',sc.sc_id ,'name',sc.sc_id ) as "subCommodity",
        pcsd.quantity_type as quality,
        pcsd.quantity as quantity,
        pcsd.incoming_date_time as "incomingDateTime",
        'PROCESSED' as type
        from unjhastockmanagement.processed_current_stock_details pcsd
        left join unjhastockmanagement.commodity c on c.c_id = pcsd.c_id
        left join unjhastockmanagement.sub_commodity sc on sc.sc_id = pcsd.sc_id

        union all

        select
        jsonb_build_object('id' , c.c_id ,'name',c.c_name ) as commodity,
        jsonb_build_object('id',sc.sc_id ,'name',sc.sc_id ) as "subCommodity",
        null as quality,
        ucsd.quantity as quantity,
        ucsd.incoming_date_time  as "incomingDateTime",
        'UNPROCESSED' as type
        from unjhastockmanagement.unprocessed_current_stock_details ucsd
        left join unjhastockmanagement.inward_stocks i_s on i_s.ins_id = ucsd.inward_stock_id
        left join unjhastockmanagement.commodity c on c.c_id = i_s.c_id
        left join unjhastockmanagement.sub_commodity sc on sc.sc_id = i_s.sc_id
        where i_s.is_active = 1
        ;

        `);
    }
     public async getUnprocessedStock(commodityId,SubCommodityId){
         return await this.manager.query(`select
         ucsd.unpcsd_id as "id",
         ins.ins_id as "insId",
         s.s_id "supplierId",
         s.s_name "supplierName",
         c.c_id "commodityId",
         c.c_name  "commodity",
         sc.sc_id "subCommodityId",
         sc.sc_name "subCommodity",
         ucsd.quantity "quantity",
         ucsd.incoming_date_time "incomingDateTime"
         from unjhastockmanagement.unprocessed_current_stock_details ucsd
         inner join unjhastockmanagement.inward_stocks ins on ins.ins_id  = ucsd.inward_stock_id
         left join unjhastockmanagement.commodity c on c.c_id  = ins.c_id
         left join unjhastockmanagement.sub_commodity sc on sc.sc_id = ins.sc_id
         left join unjhastockmanagement.suppliers s on s.s_id = ins.s_id
         where ins.c_id = ${commodityId} and ins.sc_id = ${SubCommodityId} ;`);
     }

     public async getProcessedStock(commodityId,SubCommodityId){
        let condition:string =' ';
        if(commodityId || SubCommodityId){
            condition = 'where ';
            if(commodityId && SubCommodityId){
                condition = `${condition}c.c_id = ${commodityId} and sc.sc_id = ${SubCommodityId}`;
            }
            else if(commodityId && !SubCommodityId){
                condition = `${condition}c.c_id = ${commodityId}`
            }
        }

        return await this.manager.query(`select
        pcsd.pcsd_id as id,
        jsonb_build_object('id' , c.c_id ,'name',c.c_name ) as commodity,
        jsonb_build_object('id',sc.sc_id ,'name',sc.sc_name ) as "subCommodity",
        pcsd.quantity_type as quality,
        pcsd.quantity as quantity,
        pcsd.incoming_date_time as "incomingDateTime"
        from unjhastockmanagement.processed_current_stock_details pcsd
        left join unjhastockmanagement.commodity c on c.c_id = pcsd.c_id
        left join unjhastockmanagement.sub_commodity sc on sc.sc_id = pcsd.sc_id ${condition};`);
    }

     async addToProcessing(details:ProcessingStockDto []){
         try{
             details.forEach(async(detail)=>{
                let unprocStock:NotProcessedCurrentStockDetailsEntity = await this.unProcessedCurrentStockRepository.findOne(detail.id);
                if(unprocStock.QuantityInKg == detail.quantity){
                    await this.unProcessedCurrentStockRepository.delete(detail.id)
                }
                else if(unprocStock.QuantityInKg > detail.quantity ) {
                    unprocStock.QuantityInKg = unprocStock.QuantityInKg - detail.quantity;
                    await this.unProcessedCurrentStockRepository.update(detail.id,unprocStock);
                }
             })
            await this.inProcessingRepo.save(details.map((detail)=> this.convertProcessingDtoToStockInProcessingDetails(detail)));
         }catch (err) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

     }
     convertProcessingDtoToStockInProcessingDetails(dto:ProcessingStockDto):StockInProcessingDetails{
        let model : StockInProcessingDetails = new StockInProcessingDetails();
        model.cId = dto.commodityId;
        model.quantity=dto.quantity;
        model.sId=dto.supplierId;
        model.scId=dto.subCommodityId;
        model.isActive =1;
        model.unprocessedCurrentStockId =dto.id;
        model.inwardStockId=dto.insId;
        return model;
     }

}
