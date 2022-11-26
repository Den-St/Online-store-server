import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CharacteristicCreateDto} from "./dto/characteristic-create.dto";
import {CharacteristicValueEntity} from "../entities/characteristic-value.entity";
import {CharacteristicEntity} from "../entities/characteristic.entity";
import {CharacteristicsValueService} from "../characteristics-value/characteristics-value.service";
import {CharacteristicAddValueDto} from "./dto/characteristic-addValue.dto";
import {CharacteristicSetValueDto} from "./dto/characteristic-setValue.dto";
import {CharacteristicCreateNewProductDto} from "./dto/characteristic-create-new-product.dto";

@Injectable()
export class CharacteristicsService {
    constructor(@InjectRepository(CharacteristicEntity) private readonly characteristicRepository:Repository<CharacteristicEntity>,
                private readonly charValueService:CharacteristicsValueService) {}

    async create(dto:CharacteristicCreateDto):Promise<CharacteristicEntity> {
        return await this.characteristicRepository.save(dto);
    }

    async addValue(dto:CharacteristicAddValueDto):Promise<CharacteristicEntity> {
        const characteristicValue = await this.charValueService.getById(dto.valueId);
        const prevCharacteristic = await this.characteristicRepository.findOne({
            relations: {
                values: true,
            },
            where: {
                id: dto.charId
            },
        });

        const newChar = await this.characteristicRepository
            .create({...prevCharacteristic,values:[...prevCharacteristic.values,characteristicValue]});

        return await this.characteristicRepository.save(newChar);
    }
    
    async getById(id:number):Promise<CharacteristicEntity> {
        return await this.characteristicRepository.findOne({
            where: {id},
            relations:["values"],
        });
    }

    async setValue(dto:CharacteristicSetValueDto):Promise<CharacteristicEntity> {
        const value = await this.charValueService.getById(dto.valueId);
        const prevCharacteristic = await this.characteristicRepository.findOne({
            relations: [
                "values"
            ],
            where: {
                id: dto.charId
            },
        });

        const newChar = await this.characteristicRepository
            .create({...prevCharacteristic,value:value});

        return await this.characteristicRepository.save(newChar);
    }

    async createCharacteristicPackForProduct(characteristics:CharacteristicEntity[],valuesIds:number[]):Promise<CharacteristicEntity[]> {
        const newChars = [];
        for(let i = 0;i < characteristics.length;i++){
            let {id,value,createdAt,updatedAt,...filteredChar} = characteristics[i];
            let charValue = await this.charValueService.getById(valuesIds[i]);
            let char = await this.createNewProductChar(filteredChar,charValue);
            newChars.push(char);
        }
        return newChars;
    }

    private async createNewProductChar(char:CharacteristicCreateNewProductDto,charValue:CharacteristicValueEntity):Promise<CharacteristicEntity> {
        return await this.characteristicRepository.save({name:char.name,values:char.values,value:charValue});
    }

}
