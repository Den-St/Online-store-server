import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsString } from 'class-validator';

@InputType()
export class UserEditDto {
    @IsNumber()
    @Field()
    id:number;
    @IsString()
    @Field()
    name:string;

    @IsString()
    @IsEmail()
    @Field()
    email:string;

    @IsString()
    @Field()
    phoneNumber:string;
}