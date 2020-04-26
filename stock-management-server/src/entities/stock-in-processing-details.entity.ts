import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('stock_in_processing_details')
export class StockInProcessingDetails{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id:number;
    @Column({name :'inward_stock_id'})
    public inwardStockId:number;
    @Column({name :'s_id'})
    public sId:number;
    @Column({name :'c_id'})
    public cId:number;
    @Column({name :'sc_id'})
    public scId:number;
    @Column({name :'quantity'})
    public quantity:number;
    @Column({name :'unprocessed_current_stock_id'})
    public unprocessedCurrentStockId:number;
    @Column({name :'is_active',default:0})
    public isActive:number;
    @Column({name :'incoming_date', default: new Date()})
    public incomingDate:Date;
    @Column({name :'created_date', default: new Date()})
    public createdDate:Date;
    @Column({name :'updated_date', default: new Date()})
    public updatedDate:Date;

}