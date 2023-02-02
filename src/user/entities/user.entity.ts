import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
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
  @ManyToMany(() => Role, (role) => role.roleId, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_role', // 此关系的联结表的表名
    joinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role',
      referencedColumnName: 'roleId',
    },
  })
  roles: Role[];
}
