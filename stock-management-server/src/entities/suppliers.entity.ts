import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('suppliermst')
export class Suppliers {
  @PrimaryGeneratedColumn()
  SID: number;

  @Column()
  SFname: string;

  @Column()
  SMname: string;

  @Column()
  SLName: string;

  @Column()
  SFirm: string;

  @Column()
  SEmailID: string;

  @Column()
  SConNo: string;

  @Column()
  SAddr: string;

  @Column({ default: true })
  IsActive:boolean

  @Column()
  CreateDt:Date

  @Column()
  CreatedBy:string;

  @Column()
  ModiDt:string;

  @Column()
  ModiBy:Date;
}