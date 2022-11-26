import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";

@InputType()
export class CreateCommentDto {
    @Field()
    @IsNumber()
    creatorId:number;

    @Field()
    @IsString()
    text:string;

    @Field({defaultValue:""})
    @IsString()
    responseToCommentCreatorName:string;

    @Field({defaultValue:0})
    @IsNumber()
    reviewId:number;
}