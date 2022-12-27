import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolePermissions } from './role_permissions.entity';

@Entity({ name: 'user_roles' })
export class UserRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @OneToMany(() => RolePermissions, (role) => role.role)
  listRecipe: RolePermissions[];
}
