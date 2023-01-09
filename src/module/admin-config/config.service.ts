import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Delivery } from './entities/delivery.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepo: Repository<Delivery>,
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
  ) {}
  delivery() {
    return this.deliveryRepo.findOne({ where: { status: 1 } });
  }
  cart() {
    return this.cartRepo.findOne({ where: { status: 1 } });
  }
}
