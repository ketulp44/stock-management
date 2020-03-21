import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('commodity')
export class Commodity {
  @PrimaryGeneratedColumn({ name: 'c_id' })
  CommodityID: number;

  @Column({ name: 'c_name' })
  CommodityName: string;

  @Column({ name: 'is_active' })
  IsActive: number;

  @Column({ name: 'created_dt_time', default: new Date() })
  CreatedDateTime: Date

  @Column({ name: 'updated_dt_time', default: new Date() })
  UpdateDateTime: Date;
  
}