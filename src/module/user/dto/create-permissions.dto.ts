import { ApiProperty } from "@nestjs/swagger";

export class CreatePermissions{
    @ApiProperty()
    name:string;
    @ApiProperty()
    description:string;
}