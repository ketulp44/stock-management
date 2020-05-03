import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('suppliers')
export class Suppliers {
  @PrimaryGeneratedColumn({ name: 's_id' })
  SupplierID: number;

  @Column({ name: 's_name' })
  SupplierName: string;

  @Column({ name: 'contact_number' })
  ContactNumber: string;

  @Column({ name: 'is_active' })
  IsActive: number;

  @Column({ name: 'created_dt_time', default: new Date() })
  CreatedDateTime: Date

  @Column({ name: 'updated_dt_time', default: new Date() })
  UpdateDateTime: Date;

}