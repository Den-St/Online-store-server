import {Field, ObjectType} from "@nestjs/graphql";
import {RoleEntity} from "../../entities/role.entity";

@ObjectType()
export class AuthGetMeType {
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