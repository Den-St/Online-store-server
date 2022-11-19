import {Field, InputType} from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class RoleCreateDto{
    @IsString()
    @Field()
    name:string;

    @IsString()
    @Field()
    value:string;
}