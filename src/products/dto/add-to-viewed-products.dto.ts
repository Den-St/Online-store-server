import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddToViewedProductsDto {
    @Field()
    userId:number;
    @Field()
    productId:number;
}