import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('processed_current_stock_details')
export class ProcessedCurrentStockDetailsEntity {

    @PrimaryGeneratedColumn({ name: 'pcsd_id', })
    public ProcessStockDetailsId: number;

    @Column({name :'inward_stock_id'})
    public InwardStockId: number;

    @Column({name :'quantity'})
    public QuantityInKg: number;

    @Column({ name: 'quantity_type' })
    QualityType: string;

    @Column({name:'c_id'})
    commodity: number;

    @Column({name:'sc_id'})
    subCommodity: number;

    @Column({name :'incoming_date_time'})
    public IncomingDateTime: Date;

    @Column({ name: 'created_dt_time', default: new Date() })
    CreatedDateTime: Date

    @Column({ name: 'updated_dt_time', default: new Date() })
    UpdateDateTime: Date;

}