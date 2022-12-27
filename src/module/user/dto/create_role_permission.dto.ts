import { ApiProperty } from "@nestjs/swagger";

export class CreateRolePermissions{
    @ApiProperty()
    role_id:number;
    @ApiProperty()
    permission_id:number;
}