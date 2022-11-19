import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteProductFromCartDto {
    @Field()
    productId:number;

    @Field()
    userId:number;
}