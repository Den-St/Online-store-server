import {Field, InputType} from "@nestjs/graphql";
import {IsEmail, IsString, Length} from "class-validator";

@InputType()
export class UserCreateDto{
    @IsString()
    @IsEmail()
    @Field()
    email:string;

    @IsString()
    @Length(4,16,{message:"Password has incorrect length"})
    @Field()
    password:string;

    @IsString()
    @Field()
    name:string;

    @IsString()
    @Length(10,10,{message:"Phone number has incorrect length"})
    @Field()
    phoneNumber:string;
}