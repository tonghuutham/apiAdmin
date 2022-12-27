import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRoles } from './entities/user_roles.entity';
import { Permission } from './entities/permissions.entity';
import { RolePermissions } from './entities/role_permissions.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User,UserRoles,Permission,RolePermissions])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
