import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CartItemEntity } from 'src/entities/cart-item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CartItemsService {
    constructor(@InjectRepository(CartItemEntity) public readonly cartItemRepository:Repository<CartItemEntity>){}

    async createAndSave(dto:{product:ProductEntity,number:number}) {
        const newCartItem =  this.cartItemRepository.create({product:dto.product,number:dto.number});
        await this.cartItemRepository.save(newCartItem);
        return newCartItem;
    }
    async deleteByProduct(product:ProductEntity) {
        await this.cartItemRepository.delete({product:product});
    }
    async deleteById(id:number) {
        await this.cartItemRepository.delete({id:id});
    }
}
