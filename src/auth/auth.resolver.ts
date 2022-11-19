import {Args, Context, GraphQLExecutionContext, Mutation, Query, Resolver} from '@nestjs/graphql';
import {AuthService} from "./auth.service";
import {UserCreateDto} from "../users/dto/user-create.dto";
import {AuthLoginDto} from "./dto/auth-login.dto";
import {ExecutionContext, UsePipes} from "@nestjs/common";
import {ValidationPipe} from "../pipes/validation.pipe";
import {AuthGetMeType} from "./types/authGetMe.type";
import {AuthType} from "./types/auth.type";

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly authService:AuthService
    ) {}

    @UsePipes(ValidationPipe)
    @Mutation(() => AuthType)
    async register(@Args("register") dto:UserCreateDto):Promise<AuthType> {
        return await this.authService.register(dto);
    }

    @UsePipes(ValidationPipe)
    @Mutation(() => AuthType)
    async login(@Args("login") dto:AuthLoginDto):Promise<AuthType> {
        return await this.authService.login(dto);
    }

    @Query(() => AuthGetMeType)
    getMe(@Args("getMe") token:string):AuthGetMeType {
        return this.authService.getMe(token);
    }
}
