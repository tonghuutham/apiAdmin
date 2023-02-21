import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDto {
  id: number;

  @ApiProperty()
  status: number;
}
