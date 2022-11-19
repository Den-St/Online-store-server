import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ChangeProductNumberDto {
    @Field()
    userId:number;
    
    @Field()
    productId:number;

    @Field()
    number:number;
}