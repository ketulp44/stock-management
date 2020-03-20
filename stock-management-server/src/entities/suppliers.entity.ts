import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('suppliers')
export class Suppliers {
  @PrimaryGeneratedColumn({ name: 's_id' })
  SID: number;

  @Column({ name: 's_name' })
  SFname: string;

  @Column({ name: 'created_dt_time' })
  CreateDt: Date

  @Column({ name: 'updated_dt_time' })
  ModiDt: Date;

}