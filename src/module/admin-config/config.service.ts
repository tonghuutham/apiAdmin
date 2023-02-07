import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
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

  updateDelivery(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    updateDeliveryDto.id = id;
    console.log(updateDeliveryDto);
    return this.deliveryRepo.save(updateDeliveryDto);
  }

  cart() {
    return this.cartRepo.findOne({ where: { status: 1 } });
  }

  updateCart(id: number, updateCartDto: UpdateCartDto) {
    updateCartDto.id = id;
    console.log(UpdateCartDto);
    return this.cartRepo.save(updateCartDto);
  }
}
