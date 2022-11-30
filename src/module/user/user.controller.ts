import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';
import { CreateUserRolesDto } from './dto/user-role.dto';
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
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

  @Patch(':id')
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
}
