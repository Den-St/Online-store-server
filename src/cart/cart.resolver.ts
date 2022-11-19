import { DeleteProductFromCartDto } from './dto/delete-product.dto';
import { AddProductToCartDto } from './dto/add-product.dto';
import { CartService } from 'src/cart/cart.service';
import { CartEntity } from 'src/entities/cart.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductEntity } from 'src/entities/product.entity';
import { ChangeProductNumberDto } from './dto/change-product-number.dto';
import { CartProductT } from 'src/entities/cart-product.entity';

@Resolver()
export class CartResolver {
    constructor(private readonly cartService:CartService){}

    @Mutation(() => CartEntity)
    async addProductToCart(@Args("addProductToCart") dto:AddProductToCartDto):Promise<CartEntity> {
        return await this.cartService.addOneProduct(dto);
    }

    @Query(() => [CartProductT])
    async getCartByUserId(@Args("getCartByUserId") id:number):Promise<CartProductT[]> {
        return await this.cartService.getCartByUserId(id);
    }

    @Query(() => [Number])
    async getProductIdsInCartByUserId(@Args("getProductIdsInCartByUserId") id:number):Promise<number[]> {
        return await this.cartService.getProductIdsByUserId(id);
    }

    @Mutation(() => CartEntity)
    async deleteProductFromCart(@Args("deleteProductFromCart") dto:DeleteProductFromCartDto):Promise<CartEntity> {
        return await this.cartService.deleteProduct(dto);
    }
    
    @Mutation(() => CartEntity)
    async changeProductNumber(@Args("changeProductNumber") dto:ChangeProductNumberDto):Promise<CartEntity> {
        return await this.cartService.changeProductNumber(dto);
    }
}
