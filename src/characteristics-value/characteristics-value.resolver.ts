import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {CharacteristicsValueService} from "./characteristics-value.service";
import {CharacteristicValueEntity} from "../entities/characteristic-value.entity";
import {CharacteristicValueCreateDto} from "./dto/CharacteristicValueCreate.dto";
import {Roles} from "../decorators/roles.decorator";
import {UseGuards, UsePipes} from "@nestjs/common";
import { ValidationPipe } from 'src/pipes/validation.pipe';
import {RoleGuard} from "../guards/role.guard";

@Resolver("CharValue")
export class CharacteristicsValueResolver {
    constructor(private readonly charValueService:CharacteristicsValueService) {}

    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @UsePipes(ValidationPipe)
    @Mutation(() => CharacteristicValueEntity)
    async createCharValue(@Args("createCharValue") dto:CharacteristicValueCreateDto):Promise<CharacteristicValueEntity>{
        return await this.charValueService.create(dto);
    }
}
