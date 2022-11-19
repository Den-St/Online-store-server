import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class tokenT {
    @Field()
    token:string;
}
