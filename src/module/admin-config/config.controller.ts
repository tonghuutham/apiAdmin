import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';
import { ConfigService } from './config.service';

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
}
