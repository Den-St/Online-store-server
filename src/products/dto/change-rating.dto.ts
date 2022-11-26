import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ChangeRatingDto {
    @Field()
    rate:number;

    @Field()
    productId:number;
}