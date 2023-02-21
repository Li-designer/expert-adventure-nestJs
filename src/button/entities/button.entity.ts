import {
  Entity,
  BaseEntity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Menu } from '@/menu/entities/menu.entity';
@Entity({ name: 'button' })
export class Button extends BaseEntity {
  @PrimaryGeneratedColumn()
  btnId: number;

  @Column({ type: 'varchar', name: 'btn_per' })
  btnPer: string;

  @Column({ type: 'varchar', name: 'btn_name' })
  btnName: string;

  /**
   * @菜单和按钮权限
   * @一对多
   * @一个按钮权限对应一个菜单
   */
  @ManyToOne((type) => Menu, (menu) => menu.buttons)
  menus: Menu;
}
