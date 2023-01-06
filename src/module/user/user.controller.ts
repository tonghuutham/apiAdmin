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
@ApiBearerAuth()
@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post('/admin')
  createAdmin(@Body() createUserDto: CreateUserDto) {
    createUserDto.user_role_id=1;
    return this.userService.create(createUserDto);
  }
  @Public()
  @Post('/user')
  create(@Body() createUserDto: CreateUserDto) {
    createUserDto.user_role_id=2;
    return this.userService.create(createUserDto);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Patch(':id/:user_role_id')
  updateRole(@Param('id') id: number,@Param('user_role_id') user_role_id :number){
    return this.userService.updateRole(id,user_role_id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Post('/roles')
  createUserRoles(@Body() createUserDto: CreateUserRolesDto) {
    return this.userService.createUserRoles(createUserDto);
  }
  @Delete('/roles/:id')
  removeRole(@Param('id') id: string) {
    return this.userService.removeRole(+id);
  }
  @Post('/permissions')
  createPermission(@Body() permission:CreatePermissions){
  return this.userService.createPermission(permission);}
  @Get('/permissions/:id')
  findOnePer(@Param('id') id: number) {
    return this.userService.getPermission(id);
  }
  @Put('/permissions/:id')
  updatePermission(@Param('id') id: number, @Body() updatePermission: CreatePermissions) {
    return this.userService.updatePermission(id,updatePermission);
  }

  @Delete('/rolepermissions/:id')
  removeRolePermission(@Param('id') id: number) {
    return this.userService.removeRolePermission(id);
  }
  @Post('/rolepermissions')
  createRolePermission(@Body() permission:CreateRolePermissions){
  return this.userService.createRolePermission(permission);}
  @Get('/rolepermissions/:id')
  findOnePers(@Param('id') id: number) {
    return this.userService.getPermissions(id);
  }
}
