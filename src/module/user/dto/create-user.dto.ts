import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
  
  user_role_id:number;
  @ApiProperty()
  gender:number;
   
  @ApiProperty()
  dob:Date;

  @ApiProperty()
  phoneNumber:string;
}
