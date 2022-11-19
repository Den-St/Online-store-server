import {Field, InputType} from "@nestjs/graphql";
import {IsNumber} from "class-validator";

@InputType()
export class CharacteristicAddValueDto {
    @IsNumber()
    @Field()
    charId:number;

    @IsNumber()
    @Field()
    valueId:number;
}
