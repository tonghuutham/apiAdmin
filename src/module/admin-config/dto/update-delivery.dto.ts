import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeliveryDto {
  id: number;

  @ApiProperty()
  status: number;
}
