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

  async updateDelivery(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    const delivery=await this.deliveryRepo.findOne({ where: { id: id } });
    if (delivery===null){
      return 'khong ton tai';
    }
    delivery.status=updateDeliveryDto.status;
    return this.deliveryRepo.save(delivery);
  }

  cart() {
    return this.cartRepo.findOne({ where: { status: 1 } });
  }

  async updateCart(id: number, updateCartDto: UpdateCartDto) {
    const cart=await this.cartRepo.findOne({ where: { id: id } });
    if (cart===null){
      return 'khong ton tai';
    }
    cart.status=updateCartDto.status;
    return this.cartRepo.save(cart);
  }
}
