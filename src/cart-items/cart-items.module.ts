import { CartItemEntity } from './../entities/cart-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CartItemsResolver } from './cart-items.resolver';
import { CartItemsService } from './cart-items.service';

@Module({
  imports:[TypeOrmModule.forFeature([CartItemEntity])],
  providers: [CartItemsResolver, CartItemsService],
  exports:[CartItemsService]
})
export class CartItemsModule {}
