import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inward_stocks')
export class InwardStock {
  @PrimaryGeneratedColumn({ name: 'ins_id' })
  InwardStockId: number;

  @Column({ name: 's_id' })
  SupplierId: number;

  @Column({ name: 'c_id' })
  CommodityId: number;

  @Column({ name: 'sc_id' })
  SubCommodityId: number;

  @Column({ name: 'process_type' })
  ProcessType: string;

  @Column({ name: 'quantity_type' })
  QualityType: string;

  @Column({ name: 'package_size' })
  PackageSize: number;

  @Column({ name: 'package_unit' })
  PackageUnit: string;

  @Column({ name: 'no_of_bags' })
  NoOfBags: number;

  @Column({ name: 'stock_location' })
  StockLocation: string;

  @Column({ name: 'price' })
  StockPrice: number;

  @Column({ name: 'incm_date_time' })
  IncomingDate: Date;

  @Column({ name: 'is_active' })
  IsActive: number;

  @Column({ name: 'created_dt_time', default: new Date() })
  CreatedDateTime: Date

  @Column({ name: 'updated_dt_time', default: new Date() })
  UpdateDateTime: Date;

  @Column({ name: 'is_editable' })
  IsEditable: number;

}

