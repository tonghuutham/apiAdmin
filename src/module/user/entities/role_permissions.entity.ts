import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permissions.entity";
import { UserRoles } from "./user_roles.entity";
@Entity({name:'role_permissions'})
export class RolePermissions{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    role_id:number;
    @Column()
    permission_id:number;
    @ManyToOne(() => UserRoles)
    @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
    role: UserRoles;

    @ManyToOne(() => Permission)
    @JoinColumn({ name: 'permission_id', referencedColumnName: 'id' })
    permission: Permission;
}