import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsString } from "class-validator";

@InputType()
export class ImageCreateDto {
    @IsString()
    @Field()
    url:string;

    @IsBoolean()
    @Field()
    isMain:boolean;
}