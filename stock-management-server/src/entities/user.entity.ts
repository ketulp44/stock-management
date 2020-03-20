import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_mst')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  user_id: number;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'full_name' })
  full_name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'role_id' })
  role_id: number;

  @Column({ name: 'is_enabled' })
  is_enabled: number;

  @Column({ name: 'is_enabled', default: '1' })
  is_active: number;

  @Column({ name: 'entry_by' })
  entry_by: number;

  @Column({ name: 'entry_dt_time' })
  entry_dt_time: Date;

  @Column({ name: 'updated_by' })
  updated_by: number;

  @Column({ name: 'update_dt_time' })
  update_dt_time: Date;
}