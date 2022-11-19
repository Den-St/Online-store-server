import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class ReceiptCreateDto{
    @Field()
    buyerId:number;
    @Field()
    productId:number;
    @Field()
    amountToBuy:number;
}