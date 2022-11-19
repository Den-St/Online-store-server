import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {RoleEntity} from "../entities/role.entity";
import {Repository} from "typeorm";
import {RoleCreateDto} from "./dto/role-create.dto";

@Injectable()
export class RolesService {
    constructor(@InjectRepository(RoleEntity) private readonly roleRepository:Repository<RoleEntity>) {};

    async createRole(dto:RoleCreateDto):Promise<RoleEntity> {
        return await this.roleRepository.save(dto);
    }
    async getAll():Promise<RoleEntity[]> {
        return await this.roleRepository.find();
    }
    async getByValue(value:string) {
        return await this.roleRepository.findOne({where:{value}})
    }
    async getAllWithoutAdmin():Promise<RoleEntity[]> {
        const roles = await this.roleRepository.find();
        return roles.filter(role => role.value != 'ADMIN');
    }
}
