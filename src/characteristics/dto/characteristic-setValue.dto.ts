import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CharacteristicSetValueDto{
    @Field()
    charId:number;

    @Field()
    valueId:number;
}