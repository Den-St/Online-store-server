import { Field, InputType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class GetReviewsDto {
    @Field()
    @IsNumber()
    productId:number

    @Field()
    @IsNumber()
    limit:number;

    @Field()
    @IsNumber()
    skip:number;
}