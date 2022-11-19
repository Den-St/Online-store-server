import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CharacteristicValueEntity} from "../entities/characteristic-value.entity";
import {Repository} from "typeorm";
import {CharacteristicValueCreateDto} from "./dto/CharacteristicValueCreate.dto";

@Injectable()
export class CharacteristicsValueService {
    constructor(@InjectRepository(CharacteristicValueEntity) public readonly charValueRepository:Repository<CharacteristicValueEntity>) {}

    async create(dto:CharacteristicValueCreateDto):Promise<CharacteristicValueEntity> {
        return await this.charValueRepository.save(dto);
    }

    async getById(id:number):Promise<CharacteristicValueEntity> {
        return await this.charValueRepository.findOneById(id);
    }
}
