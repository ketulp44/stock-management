import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  user_id: number;

  @Column({ name: 'user_name' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'role' })
  role: string;

  @Column({ name: 'is_enabled' })
  IsEnabled: number;

  @Column({ name: 'is_active' })
  IsActive: number;

  @Column({ name: 'created_dt_time', default: new Date() })
  CreatedDateTime: Date

  @Column({ name: 'updated_dt_time', default: new Date() })
  UpdateDateTime: Date;
}