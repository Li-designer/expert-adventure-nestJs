import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { Role } from '@/role/entities/role.entity';
@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'username' })
  username: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  /**
   * @用户和角色
   * @多对多
   */
  @ManyToMany(() => Role, (role) => role.roleId)
  roleIds: Role[];
}
