import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {UserEntity} from "../entities/user.entity";
import * as bcrypt from 'bcrypt';
import {UserCreateDto} from "../users/dto/user-create.dto";
import {AuthLoginDto} from "./dto/auth-login.dto";
import {tokenT} from "./types/tokenT";
import {authPayloadT} from "./types/authPayloadT";
import {AuthGetMeType} from "./types/authGetMe.type";
import {AuthType} from "./types/auth.type";

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService)) private readonly userService:UsersService,
        private readonly jwtService:JwtService,
    ) {}

    async validate(email:string,password:string):Promise<UserEntity | null>{
        const user = await this.userService.getUserByEmail(email);
        if(!user) {
            return null;
        }
        const passwordEquals = bcrypt.compare(user.password,password);
        return passwordEquals ? user : null;
    }

    async register(dto:UserCreateDto):Promise<AuthType> {
        try {
            const candidate = await this.userService.getUserByEmail(dto.email);
            console.log("can", candidate)
            if (candidate) throw new HttpException("email already in use", HttpStatus.BAD_REQUEST);

            const hashPassword = await bcrypt.hash(dto.password, 10);
            const user = await this.userService.createUser({...dto, password: hashPassword});
            return {
                token:this.generateToken(user),
                ...user
            };
        }catch (err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(dto:AuthLoginDto):Promise<AuthType>{
        const user = await this.validate(dto.email,dto.password);
        console.log("login",user);
        if(user){
            return {
                token: this.generateToken(user),
                ...user
            };
        }
        throw new HttpException("bad login data",HttpStatus.BAD_REQUEST);
    }

    getMe(token:string):AuthGetMeType {
        const user = this.jwtService.verify(token) as AuthGetMeType;
        console.log("user",user);
        return user;
    }

    generateToken(userData:UserEntity) {
        const payload:authPayloadT = {...userData} as authPayloadT;
        return this.jwtService.sign(payload);
    }
}
