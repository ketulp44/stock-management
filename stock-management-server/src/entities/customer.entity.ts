import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn({ name: 'cu_id' })
  CustomerID: number;

  @Column({ name: 'cu_name' })
  CustomerName: string;

  @Column({ name: 'is_active' })
  IsActive: number;

  @Column({ name: 'created_dt_time', default: new Date() })
  CreatedDateTime: Date

  @Column({ name: 'updated_dt_time', default: new Date() })
  UpdateDateTime: Date;
  
}