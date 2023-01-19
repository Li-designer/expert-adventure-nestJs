import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'username' })
  username: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  // @ManyToOne((type) => Role, (role) => role.users)
  // role: Role;
}
