import { OrderRuleT } from './product-filter.dto';
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SearchProductsDto {
    @Field()
    productName:string;

    @Field()
    orderRule:OrderRuleT;

    @Field()
    page:number;
}