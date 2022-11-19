import { Field ,InputType} from "@nestjs/graphql";


@InputType()
export class ProductFilterDto {
    @Field()
    categoryId:number;

    @Field(() => [String])
    charValuesId:string[];
}