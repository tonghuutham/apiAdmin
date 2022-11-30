import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_roles' })
export class UserRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}
