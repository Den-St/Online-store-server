import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class ProductConfirmBuyDto {
    @Field()
    productId:number;
    @Field()
    amountToBuy:number;
}