import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sub_commodity')
export class SubCommodity {
  @PrimaryGeneratedColumn({ name: 'sc_id' })
  SubCommodityID: number;

  @Column({ name: 'sc_name' })
  SubCommodityName: string;

  @Column({ name: 'com_id' })
  CommodityId: string;

  @Column({ name: 'is_active' })
  IsActive: number;

  @Column({ name: 'created_dt_time', default: new Date() })
  CreatedDateTime: Date

  @Column({ name: 'updated_dt_time', default: new Date() })
  UpdateDateTime: Date;
  
}