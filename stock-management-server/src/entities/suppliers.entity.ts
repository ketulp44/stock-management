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

  @Column({ default: 1 })
  IsActive:number

  @Column()
  CreateDt:Date

  @Column()
  CreatedBy:string;

  @Column()
  ModiDt:Date;

  @Column()
  ModiBy:Date;
}