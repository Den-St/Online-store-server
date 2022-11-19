import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CategoriesAddCharDto {
    @Field()
    categoryId:number;
    @Field()
    characteristicId:number;
}