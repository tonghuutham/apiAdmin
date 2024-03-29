import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';
import { CreateUserRolesDto } from './dto/user-role.dto';
import { CreatePermissions } from './dto/create-permissions.dto';
import { CreateRolePermissions } from './dto/create_role_permission.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
@ApiBearerAuth()
@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post('/admin')
  createAdmin(@Body() createUserDto: CreateUserDto) {
    createUserDto.user_role_id = 1;
    return this.userService.create(createUserDto);
  }
  @Public()
  @Post('/user')
  create(@Body() createUserDto: CreateUserDto) {
    createUserDto.user_role_id = 2;
    return this.userService.create(createUserDto);
  }
  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get('/admin')
  // findAllAdmin() {
  //   return this.userService.findAllAdmin();
  // }

  @Patch(':id/:user_role_id')
  updateRole(
    @Param('id') id: number,
    @Param('user_role_id') user_role_id: number,
  ) {
    return this.userService.updateRole(id, user_role_id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Get('/byname/:name')
  findName(@Param('name') name: string) {
    return this.userService.findName(name);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('/roles/get-all')
  getAllRoles() {
    return this.userService.getAllRoles();
  }
  @Post('/roles')
  createUserRoles(@Body() createUserDto: CreateUserRolesDto) {
    return this.userService.createUserRoles(createUserDto);
  }
  @Put('/roles/:id')
  updateRoles(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.userService.updateRoleName(+id, updateRoleDto);
  }
  @Delete('/roles/:id')
  removeRole(@Param('id') id: string) {
    return this.userService.removeRole(+id);
  }
  @Post('/permissions')
  createPermission(@Body() permission: CreatePermissions) {
    return this.userService.createPermission(permission);
  }
  @Get('/permissions/:id')
  findOnePer(@Param('id') id: number) {
    return this.userService.getPermission(id);
  }
  @Get('/permissions/byname/:name')
  findOnePerByName(@Param('name') name: string) {
    return this.userService.getPermissionByName(name);
  }
  @Get('/permissions/get/all')
  findAllPer() {
    return this.userService.getAllPermissions();
  }
  @Put('/permissions/:id')
  updatePermission(
    @Param('id') id: number,
    @Body() updatePermission: CreatePermissions,
  ) {
    return this.userService.updatePermission(id, updatePermission);
  }

  @Delete('/rolepermissions/:permission_id/:role_id')
  removeRolePermission(
    @Param('permission_id') permission_id: number,
    @Param('role_id') role_id: number,
  ) {
    return this.userService.removeRolePermission(permission_id, role_id);
  }
  @Post('/rolepermissions')
  createRolePermission(@Body() permission: CreateRolePermissions) {
    return this.userService.createRolePermission(permission);
  }
  // @Post('/rolepermissions/:permission_id/:role_id')
  // createRolePermission(
  //   @Param('permission_id') permission_id: number,
  //   @Param('role_id') role_id: number,
  // ) {
  //   return this.userService.createRolePermission(permission_id, role_id);
  // }

  @Get('/rolepermissions/:id')
  findOnePers(@Param('id') id: number) {
    return this.userService.getPermissions(id);
  }
}
