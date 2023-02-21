import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { Menu } from '@/menu/entities/menu.entity';
@Entity({ name: 'role' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({ type: 'varchar', name: 'rolename' })
  rolename: string;

  @Column({ type: 'varchar', name: 'role_type' })
  roleType: string;

  /**
   * @用户和角色
   * @多对多
   */
  @ManyToMany(() => User, (user) => user.id)
  userIds: User[];

  /**
   * @菜单和角色
   * @多对多
   */
  @ManyToMany(() => Menu, (menu) => menu.roles)
  menuKeys: Menu[];
}
