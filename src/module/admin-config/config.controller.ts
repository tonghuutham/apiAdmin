import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';
import { ConfigService } from './config.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@ApiBearerAuth()
@ApiTags('Configuration')
@Controller('api/config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}
  @Public()
  @Get('/delivery')
  getDelivery(): any {
    return this.configService.delivery();
  }
  @Public()
  @Get('/cart')
  getCart(): any {
    return this.configService.cart();
  }

  @Patch('/delivery/:id')
  updateDelivery(
    @Param('id') id: number,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.configService.updateDelivery(id, updateDeliveryDto);
  }

  @Patch('/cart/:id')
  updateCart(@Param('id') id: number, @Body() updateCartDto: UpdateCartDto) {
    return this.configService.updateCart(id, updateCartDto);
  }
}
