import { ProductEntity } from './../../entities/product.entity';
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GetProductsT {
    @Field(() => [ProductEntity])
    products:ProductEntity[]
    
    @Field()
    total:number
}