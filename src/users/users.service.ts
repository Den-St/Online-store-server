import { ProductEntity } from './../entities/product.entity';
import { CartService } from './../cart/cart.service';
import { tokenT } from './../auth/types/tokenT';
import { AuthService } from './../auth/auth.service';
import { UserEditDto } from './dto/user-edit.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {Repository} from "typeorm";
import {UserCreateDto} from "./dto/user-create.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private userRepository:Repository<UserEntity>,
        private readonly roleService:RolesService,
        @Inject(forwardRef(() => CartService)) private readonly cartService:CartService,
        @Inject(forwardRef(() => AuthService)) private authService:AuthService,
        ) {}

    async createUser(dto:UserCreateDto):Promise<UserEntity> {
        const role = await this.roleService.getByValue("USER");
        const cart = await this.cartService.create();
        const newUser = await this.userRepository.create({...dto,roles:[role],cart:cart});
        
        return await this.userRepository.save(newUser);
    }

    async giveAdminRole(userId:number):Promise<UserEntity> {
        const role = await this.roleService.getByValue("ADMIN");
        const prevUser = await this.userRepository.findOne({
            relations: {
                roles: true,
            },
            where: {
                id: userId
            },
        });
        const newUser = await this.userRepository.create({...prevUser,roles:[...prevUser.roles,role]});
        return await this.userRepository.save(newUser);
    }

    async getAll():Promise<UserEntity[]> {
        return await this.userRepository.find({
            relations:['roles'],
        });
    }
    async getUserById(id:number):Promise<UserEntity> | null{
        return await this.userRepository.findOne({
            relations:[
                "roles",
                "cart",
                "cart.cartItems",
                "recentlyViewedProducts",
                "favoriteProducts"
            ],
            where: {
                id: id
            },
        })
    }
    async getUserByEmail(email:string):Promise<UserEntity> | null{
        return await this.userRepository.findOne({
            relations: {
                roles: true,
            },
            where: {
                email: email
            },
        });
    }
    
    async editUserInfo(dto:UserEditDto):Promise<tokenT> {
        const user = await this.userRepository.findOne({
            relations: {
                roles: true,
                companies:true,
            },
            where: {
                id: dto.id
            },
        });

        const newUser = await this.userRepository.save({...user,name:dto.name,email:dto.email,phoneNumber:dto.phoneNumber});


        return {
            token:this.authService.generateToken(newUser)
        }
    }

    async saveUser(dto:UserEntity):Promise<UserEntity>{
        return await this.userRepository.save(dto);
    };

    async getUsersRecentlyViewed(userId:number):Promise<ProductEntity[]> {
        // return (await this.getUserById(userId)).recentlyViewedProducts;
        return [];
    }

    async getUsersFavoriteProducts(userId:number):Promise<ProductEntity[]> {
        // const user = await this.userRepository.findOne({where:{id:userId}});
        // return user.favoriteProducts;
        return [];
    }
}
