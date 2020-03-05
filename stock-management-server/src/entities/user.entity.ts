import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_mst')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  password: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  role_id: string;

  @Column()
  is_enabled: number;

  @Column({ default: true })
  is_active: number;

  @Column()
  entry_by:number;

  @Column()
  entry_dt_time: Date;

  @Column()
  updated_by:number;

  @Column()
  update_dt_time:Date;
}