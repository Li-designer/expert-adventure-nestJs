import {
  Entity,
  BaseEntity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
} from 'typeorm';
import { Role } from '@/role/entities/role.entity';
@Entity({ name: 'menu' })
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'path' })
  path: string;

  @Column({ type: 'varchar', name: 'component' })
  component: string;

  @Column({ type: 'varchar', name: 'title' })
  title: string;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'key' })
  key: string;
  @Column({ type: 'int', name: 'showParent', default: 1 })
  showParent: number;

  @Column({ type: 'varchar', name: 'parent_key' })
  parentKey: string;

  @Column({ type: 'varchar', name: 'icon' })
  icon: string;

  @Column({ type: 'int', name: 'rank' })
  rank: number;

  /**
   * @菜单和角色
   * @多对多
   */
  @ManyToMany(() => Role, (role) => role.menuKeys, {
    cascade: true,
  })
  @JoinTable({
    name: 'menu_role', // 此关系的联结表的表名
    joinColumn: {
      name: 'menu',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role',
      referencedColumnName: 'roleId',
    },
  })
  roles: Role[];
}
