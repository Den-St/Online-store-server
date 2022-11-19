import {Field, InputType} from "@nestjs/graphql";
import {IsEmail, IsString, Length} from "class-validator";

@InputType()
export class AuthLoginDto{
    @IsString()
    @IsEmail()
    @Field()
    email:string;

    @IsString()
    @Length(4,16,{message:"Password has incorrect length"})
    @Field()
    password:string;
}