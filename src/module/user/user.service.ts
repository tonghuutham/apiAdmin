import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserRoles)
    private readonly userRolesRepo: Repository<UserRoles>,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
    @InjectRepository(RolePermissions)
    private readonly rolePermissionRepo: Repository<RolePermissions>,
  ) {}
  async createAdmin(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepo.save(createUserDto);
  }
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepo.save(createUserDto);
  }
  async updateRole(id: number, user_role_id: number) {
    const user = await this.findOne(id);
    user.user_role_id = user_role_id;
    return this.userRepo.save(user);
  }
  findAll() {
    return this.userRepo.find();
  }

  // findAllAdmin() {
  //   return this.userRepo.find({ where: { user_role_id: Not(2) } });
  // }

  async findOne(id: number): Promise<User> {
    return await this.userRepo.findOne({
      where: { id: id },
      relations: ['permissions'],
    });
  }
  findName(name: string) {
    return this.userRepo.findOne({ where: { name: `%${name}%` } });
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

  updateRoleName(id: number, updateRoleDto: UpdateRoleDto) {
    if (this.userRolesRepo.findOne({ where: { id: id } })) {
      updateRoleDto.id = id;
      return this.userRolesRepo.save(updateRoleDto);
    }
    return 'role not found';
  }

  async getAllRolesPer(id: number) {
    const queryBuilder = this.userRolesRepo.createQueryBuilder('user_roles');
    queryBuilder.where(`user_roles.id = :id`, { id: id });
    queryBuilder.leftJoinAndSelect(`user_roles.listRecipe`, `role_permissions`);
    const material = await queryBuilder.getRawMany();
    if (material[0].role_permissions_permission_id === null) return null;
    const result = await Promise.all(
      material.map(
        (i) =>
          (i['permissions'] = this.getPermission(
            i.role_permissions_permission_id,
          )),
      ),
    );
    return result;
  }
  async getAllRoles() {
    var count = 0;
    const role = await this.userRolesRepo.find();
    const result = await Promise.all(
      role.map((i) => (i['permissions'] = this.getAllRolesPer(i.id))),
    );
    role.forEach((i) => (i['permissions'] = result[count++]));
    // i['permissions']=   await this.getAllRolesPer(i.id)
    return role;
  }
  removeRole(id: number) {
    return this.userRolesRepo.delete(id);
  }
  createPermission(permission: CreatePermissions) {
    return this.permissionRepo.save(permission);
  }
  getPermission(id: number) {
    return this.permissionRepo.findOne({ where: { id: id } });
  }
  getPermissionByName(name: string) {
    return this.permissionRepo.findOne({ where: { name: name } });
  }
  getAllPermissions() {
    return this.permissionRepo.find();
  }
  async updatePermission(id: number, permission: CreatePermissions) {
    const per = await this.getPermission(id);
    console.log(per);
    if (per) {
      per.name = permission.name;
      per.description = permission.description;
    }
    return this.permissionRepo.save(per);
  }
  async removeRolePermission(per_id: number, role_id) {
    const rolePermission = await this.rolePermissionRepo.findOne({
      where: { role_id: role_id, permission_id: per_id },
    });
    return this.rolePermissionRepo.delete(rolePermission);
  }
  createRolePermission(rolepermission: CreateRolePermissions) {
    return this.rolePermissionRepo.save(rolepermission);
  }
  async getPermissions(id: number) {
    const queryBuilder =
      this.rolePermissionRepo.createQueryBuilder('role_permissions');
    queryBuilder.leftJoinAndSelect(
      `role_permissions.permission`,
      `permissions`,
    );
    queryBuilder.where(`role_permissions.role_id = :id`, { id: id });
    const material = await queryBuilder.getRawMany();
    console.log('a', queryBuilder.getQuery());
    console.log('ahihi', material);
    return material;
  }
}
