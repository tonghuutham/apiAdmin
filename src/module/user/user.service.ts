import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from '../auth/payload.interface';
import { UserRoles } from './entities/user_roles.entity';
import { CreateUserRolesDto } from './dto/user-role.dto';
import { Permission } from './entities/permissions.entity';
import { CreatePermissions } from './dto/create-permissions.dto';
import { CreateRolePermissions } from './dto/create_role_permission.dto';
import { RolePermissions } from './entities/role_permissions.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserRoles)
    private readonly userRolesRepo:Repository<UserRoles>,
    @InjectRepository(Permission)
    private readonly permissionRepo:Repository<Permission>,
    @InjectRepository(RolePermissions)
    private readonly rolePermissionRepo:Repository<RolePermissions>,
  ) {}
  async createAdmin(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepo.save(createUserDto);
  }
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepo.save(createUserDto);
  }
  async updateRole(id:number,user_role_id:number){
    const user=await this.findOne(id)
    user.user_role_id=user_role_id;
    return this.userRepo.save(user);
  }
  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id: id } });
  }
  findName(name: string) {
    return this.userRepo.findOne({ where: { name: name } });
  }
  async login(email: string) {
    const user = await this.userRepo.findOne({ where: { email: email } });
    if (!user)
      throw new HttpException('Email does not exist', HttpStatus.NOT_FOUND);
    return user;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    if (this.userRepo.findOne({ where: { id: id } })) {
      updateUserDto.id = id;
      console.log(updateUserDto);
      return this.userRepo.save(updateUserDto);
    }
    return `Accout khong ton tai`;
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
  async userExist({ email }: JwtPayload) {
    const user = await this.userRepo.findOne({
      where: { email: email },
    });
    if (!user) throw new HttpException('invalidToken', HttpStatus.UNAUTHORIZED);
    return user;
  }
  async createUserRoles(createUserDto: CreateUserRolesDto) {
    return this.userRolesRepo.save(createUserDto);
  }
  getAllRoles() {
    return this.userRolesRepo.find();
  }
  removeRole(id: number) {
    return this.userRolesRepo.delete(id);
  }
  createPermission(permission:CreatePermissions){
    return this.permissionRepo.save(permission);
  }
  getPermission(id:number){
    return this.permissionRepo.findOne({where:{id:id}});
  }
  getPermissionByName(name:string){
    return this.permissionRepo.findOne({where:{name:name}});
  }
  getAllPermissions(){
    return this.permissionRepo.find();
  }
  async updatePermission(id:number,permission:CreatePermissions){
    const per=await this.getPermission(id);
    console.log(per)
    if(per){
      per.name=permission.name;
      per.description=permission.description;
    }
    return this.permissionRepo.save(per);
}
 removeRolePermission(id:number){
  return this.rolePermissionRepo.delete(id);
 }
 createRolePermission(rolepermission:CreateRolePermissions){
  return this.rolePermissionRepo.save(rolepermission);
}
async getPermissions(id:number){
const queryBuilder = this.rolePermissionRepo.createQueryBuilder('role_permissions');
queryBuilder.leftJoinAndSelect(`role_permissions.permission`, `permissions`);
queryBuilder.where(`role_permissions.role_id = :id`, { id:id  });
const material=await queryBuilder.getRawMany();
console.log('a',queryBuilder.getQuery())
console.log('ahihi',material)
return material;
}
}
