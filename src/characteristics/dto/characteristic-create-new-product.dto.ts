import {CharacteristicValueEntity} from "../../entities/characteristic-value.entity";

export class CharacteristicCreateNewProductDto{
    name:string;
    values:CharacteristicValueEntity[];
}