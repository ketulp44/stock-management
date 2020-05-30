import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dust_details')
export class Dust {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;



}