import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDto {
  id: number;
  @ApiProperty()
  group_name: string;

  @ApiProperty()
  status: number;
}
