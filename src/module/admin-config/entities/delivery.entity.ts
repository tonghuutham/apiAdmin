import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'delivery' })
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group_name: string;

  @Column()
  status: number;
}
