import {Field, InputType} from "@nestjs/graphql";
import {IsNumber, IsString} from "class-validator";

@InputType()
export class CharacteristicCreateDto {
    @IsString()
    @Field()
    name:string;

    // @IsNumber()
    // @Field()
    // valueId:number;
}