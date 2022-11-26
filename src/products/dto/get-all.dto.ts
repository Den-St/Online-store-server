import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetAllDto {
    @Field()
    page:number;
}