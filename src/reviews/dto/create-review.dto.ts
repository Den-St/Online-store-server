import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";

@InputType()
export class CreateReviewDto {
    @Field()
    @IsNumber()
    userId:number;

    @Field()
    @IsString()
    text:string;

    @Field()
    @IsNumber()
    productId:number;

    @Field()
    rate:number;

    @Field()
    consText:string;

    @Field()
    prosText:string;
}