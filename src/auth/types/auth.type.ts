import {Field, ObjectType} from "@nestjs/graphql";
import {RoleEntity} from "../../entities/role.entity";

@ObjectType()
export class AuthType {
    @Field()
    token:string;
    @Field()
    name:string;

    @Field()
    id:number;

    @Field()
    email:string;

    @Field()
    phoneNumber:string;

    @Field(() => [RoleEntity])
    roles:RoleEntity[];
}