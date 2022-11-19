import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddProductToCartDto {
    @Field()
    productId:number;

    @Field()
    userId:number;


}