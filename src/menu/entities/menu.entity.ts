import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'menu' })
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'path' })
  path: string;

  @Column({ type: 'varchar', name: 'title' })
  title: string;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'key' })
  key: string;

  @Column({ type: 'varchar', name: 'parent_key' })
  parentKey: string;

  @Column({ type: 'varchar', name: 'icon' })
  icon: string;

  @Column({ type: 'varchar', name: 'rank' })
  rank: number;
}
