import { Field ,InputType} from "@nestjs/graphql";

@InputType()
export class OrderRuleT {
    @Field()
    fieldName:'popularity' | 'price'

    @Field()
    orderValue:'DESC' | 'ASC'
}

@InputType()
export class ProductFilterDto {
    @Field()
    categoryId:number;

    @Field(() => [String])
    charValuesId:string[];

    @Field()
    page:number;

    @Field(() => OrderRuleT)
    orderRule:OrderRuleT;
}