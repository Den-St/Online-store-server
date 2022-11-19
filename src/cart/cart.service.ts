import { CartItemsService } from './../cart-items/cart-items.service';
import { CartItemEntity } from 'src/entities/cart-item.entity';
import { DeleteProductFromCartDto } from './dto/delete-product.dto';
import { ProductEntity } from './../entities/product.entity';
import { Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from 'src/entities/cart.entity';
import { AddProductToCartDto } from './dto/add-product.dto';
import { UsersService } from 'src/users/users.service';
import { ChangeProductNumberDto } from './dto/change-product-number.dto';

@Injectable()
export class CartService {
    constructor(
    @InjectRepository(CartEntity) private readonly cartRepository:Repository<CartEntity>,
     private readonly cartItemsService:CartItemsService,
    @InjectRepository(ProductEntity) private readonly productRepository:Repository<ProductEntity>,
    @Inject(forwardRef(() => UsersService)) private readonly userService:UsersService
   ){}

    async create():Promise<CartEntity> {
        const cart = await this.cartRepository.create();

        return await this.cartRepository.save(cart);
    }

    async addOneProduct(dto:AddProductToCartDto):Promise<CartEntity> {
        const user = await this.userService.getUserById(dto.userId);

        const product = await this.productRepository.findOne({where:{id:dto.productId}});

        const newCartItem = await this.cartItemsService.createAndSave({product:product,number:1});

        const newCart = await this.cartRepository.save({...user.cart,cartItems:[...user.cart.cartItems,newCartItem]}); 
            
        return newCart;
    }

    async changeProductNumber(dto:ChangeProductNumberDto):Promise<CartEntity> {
        const user = await this.userService.getUserById(dto.userId);
        
        for(let i = 0;i < user.cart.cartItems.length;i++) {
            if(user.cart.cartItems[i].product.id == dto.productId) {
                await this.cartItemsService.createAndSave({...user.cart.cartItems[i],number:dto.number});
                break;
            }
        }
        
        return user.cart;
    }

    async getProductIdsByUserId(id:number):Promise<number[]> {
        const cartItems = (await this.userService.getUserById(id)).cart.cartItems;
        const productIds = [...cartItems.map(cartItem =>  cartItem.product.id)];

        return productIds;
    }

    async getCartByUserId(id:number):Promise<CartItemEntity[]> {
        const user = (await this.userService.getUserById(id));
        const cartItems = user.cart.cartItems;
        return cartItems;
    }

    async deleteProduct(dto:DeleteProductFromCartDto):Promise<CartEntity> {
        const user = await this.userService.getUserById(dto.userId);

        const product = await this.productRepository.findOne({where:{id:dto.productId}});

        await this.cartItemsService.deleteByProduct(product);
        
        return user.cart;
    }

    async clearCart(userId:number) {
        const user = await this.userService.getUserById(userId);
        for(let i = 0;i < user.cart.cartItems.length;i++) {
            await this.cartItemsService.deleteById(user.cart.cartItems[i].id);
        }

        return await this.cartRepository.save({...user.cart,cartItems:[]});
    }
}
