import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserRolesDto } from './user-role.dto';

export class UpdateRoleDto extends PartialType(CreateUserRolesDto) {
  id: number;
  @ApiProperty()
  name: string;
}
