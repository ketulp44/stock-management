import { CurrentStockEntity } from './../entities/current-stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository, EntityManager, getManager, getConnection, QueryFailedError } from 'typeorm';

@Injectable()
export class CurrentStockService {


    constructor
        (
            @InjectRepository(CurrentStockEntity)
            private readonly currentStockEntity: Repository<CurrentStockEntity>,
            private readonly manager: EntityManager) {
        this.manager = getManager();
    }


    public async CurrentStockEntry() {
        try {
            await this.manager.query(`SET search_path TO ${process.env.TYPEORM_SCHEMA};`);
            await this.manager.query(`call stock_consolidation();`);
            const res = await this.manager.query(`select * from current_stocks;`);
            console.log(res);
            return 'success';
        } catch (err) {
            return 'failed';
            throw err;
        }
    }

    public async getCurrentStocks() {
        return await this.currentStockEntity.find({ where: [{ IsActive: 1 }] });
    }

}
