import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRolesDto {
    @ApiProperty()
    name: string;
  }