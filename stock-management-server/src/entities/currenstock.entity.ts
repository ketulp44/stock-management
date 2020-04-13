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

  @Column({ name: 'quantity_type' })
  QualityType: string;

  @Column({ name: 'bag_size' })
  BagSize: number;

  @Column({ name: 'package_unit' })
  PackageUnit: string;

  @Column({ name: 'no_of_bags' })
  NoOfBags: number;

  @Column({ name: 'price' })
  StockPrice: number;

  @Column({ name: 'is_active' })
  IsActive: number;

  @Column({ name: 'created_dt_time', default: new Date() })
  CreatedDateTime: Date

  @Column({ name: 'updated_dt_time', default: new Date() })
  UpdateDateTime: Date;
  
}

