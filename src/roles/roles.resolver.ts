import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {RolesService} from "./roles.service";
import {RoleEntity} from "../entities/role.entity";
import {RoleCreateDto} from "./dto/role-create.dto";
import {UseGuards, UsePipes} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import {RoleGuard} from "../guards/role.guard";
import {ValidationPipe} from "../pipes/validation.pipe";

@Resolver('Role')
export class RolesResolver {
    constructor(private readonly roleService:RolesService) {};

    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @UsePipes(ValidationPipe)
    @Mutation(() => RoleEntity)
    async createRole(@Args('createRole') dto:RoleCreateDto):Promise<RoleEntity>{
        return await this.roleService.createRole(dto);
    }

    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @Query(() => [RoleEntity])
    async getAllRoles():Promise<RoleEntity[]>{
        return await this.roleService.getAll();
    }
}
