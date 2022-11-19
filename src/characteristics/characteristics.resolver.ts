import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {CharacteristicsService} from "./characteristics.service";
import {CharacteristicEntity} from "../entities/characteristic.entity";
import {CharacteristicCreateDto} from "./dto/characteristic-create.dto";
import {CharacteristicAddValueDto} from "./dto/characteristic-addValue.dto";
import {CharacteristicSetValueDto} from "./dto/characteristic-setValue.dto";
import {Roles} from "../decorators/roles.decorator";
import {UseGuards, UsePipes} from "@nestjs/common";
import {RoleGuard} from "../guards/role.guard";
import {ValidationPipe} from "../pipes/validation.pipe";

@Resolver("Characteristics")
export class CharacteristicsResolver {
    constructor(private readonly charService:CharacteristicsService){}

    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @UsePipes(ValidationPipe)
    @Mutation(() => CharacteristicEntity)
    async createCharacteristic(@Args("createCharacteristic") dto:CharacteristicCreateDto):Promise<CharacteristicEntity> {
        return await this.charService.create(dto);
    }

    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @UsePipes(ValidationPipe)
    @Mutation(() => CharacteristicEntity)
    async addValueToChar(@Args("addValueToChar") dto:CharacteristicAddValueDto):Promise<CharacteristicEntity> {
        return await this.charService.addValue(dto);
    }

    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @UsePipes(ValidationPipe)
    @Mutation(() => CharacteristicEntity)
    async setValueToChar(@Args("setValueToChar") dto:CharacteristicSetValueDto):Promise<CharacteristicEntity>{
        return await this.charService.setValue(dto);
    }
}
