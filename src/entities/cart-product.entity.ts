import { Field, ObjectType } from '@nestjs/graphql';
import { ProductEntity } from './product.entity';

@ObjectType()
export class CartProductT {
    @Field()
    product:ProductEntity;
    @Field()
    number:number
}