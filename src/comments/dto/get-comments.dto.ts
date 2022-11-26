import { Field, InputType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class GetCommentsDto {
    @Field()
    @IsNumber()
    reviewId:number;

    @Field()
    @IsNumber()
    skip:number;

    @Field()
    @IsNumber()
    limit:number;
}