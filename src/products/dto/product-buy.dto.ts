import {Field, InputType} from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { CartProductT } from "src/entities/cart-product.entity";

@InputType()
class CartItemT {
    @Field()
    productId:number;
    @Field()
    number:number;
}

@InputType()
export class ProductBuyDto{
    @IsNumber()
    @Field()
    buyerId:number;
    @Field(() => [CartItemT])
    cartItems:CartItemT[];
}