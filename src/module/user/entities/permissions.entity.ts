import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'permissions'})
export class Permission{
@PrimaryGeneratedColumn()
id:number;
@Column()
name:string;
@Column()
description:string;
@Column()
created_at:Date;
@Column()
updated_at:Date;
}