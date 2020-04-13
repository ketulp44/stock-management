import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('unprocessed_current_stock_details')
export class NotProcessedCurrentStockDetailsEntity {

    @PrimaryGeneratedColumn({ name: 'unpcsd_id', })
    public UnProcessStockDetailsId: number;

    @Column({name :'inward_stock_id'})
    public InwardStockId: number;

    @Column({name :'quantity'})
    public QuantityInKg: number;

    @Column({name :'incoming_date_time'})
    public IncomingDateTime: Date;

    @Column({ name: 'created_dt_time', default: new Date() })
    CreatedDateTime: Date

    @Column({ name: 'updated_dt_time', default: new Date() })
    UpdateDateTime: Date;

}