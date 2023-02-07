import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeliveryDto {
  id: number;
  @ApiProperty()
  group_name: string;

  @ApiProperty()
  status: number;
}
