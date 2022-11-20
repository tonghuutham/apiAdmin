import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
  
  @Column()
  user_role_id:number;

  @Column()
  gender:number;

  @Column()
  dob:Date;

  @Column()
  phoneNumber:number;

}
