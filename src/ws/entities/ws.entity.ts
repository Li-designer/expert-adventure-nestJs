import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { Role } from '@/role/entities/role.entity';
@Entity({ name: 'ws' })
export class Ws extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'username' })
  username: string;

  @Column({ type: 'varchar', name: 'create_time' })
  createTime: string;

  @Column({ type: 'varchar', name: 'message' })
  message: string;
}
