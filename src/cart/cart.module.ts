import { CartItemsModule } from './../cart-items/cart-items.module';
import { ProductEntity } from './../entities/product.entity';
import { CartEntity } from './../entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { UsersModule } from 'src/users/users.module';
import { CartItemEntity } from 'src/entities/cart-item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CartEntity,ProductEntity]),
    forwardRef(() => UsersModule),CartItemsModule
  ],
  providers: [CartService, CartResolver],
  exports:[CartService]
})
export class CartModule {}
