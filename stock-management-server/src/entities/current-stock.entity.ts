import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('current_stocks')
export class CurrentStockEntity {
  @PrimaryGeneratedColumn({ name: 'cs_id' })
  CurrentStockId: number;

  @Column({ name: 'sc_id' })
  SubCommodityId: number;

  @Column({ name: 'c_id' })
  CommodityId: number;

  @Column({ name: 'process_type' })
  ProcessType: string;

  @Column({ name: 'quality_type' })
  QualityType: string;

  @Column({ name: 'quantity_in_kg' })
  QuantityInKg: number;

  @Column({ name: 'price' })
  StockPrice: number;

  @Column({ name: 'is_active' })
  IsActive: number;

  @Column({ name: 'created_dt_time', default: new Date() })
  CreatedDateTime: Date

  @Column({ name: 'updated_dt_time', default: new Date() })
  UpdateDateTime: Date;
  
}

