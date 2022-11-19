import {ArgumentMetadata, HttpException, HttpStatus, PipeTransform} from "@nestjs/common";
import {validate} from "class-validator";
import {plainToInstance} from "class-transformer";
import {ValidateException} from "../exceptions/validate.exception";

export class ValidationPipe implements PipeTransform<any>{
    async transform(value: any, {metatype}: ArgumentMetadata) {
        if(!metatype || !this.toValidate(metatype)) return value;
        const obj = plainToInstance(metatype,value);
        const errors = await validate(obj);

        if(errors.length) {
            const messages = errors.map(error => {
                return `${error.property} - ${Object.values(error.constraints).join(', ')}`
            })
            throw new ValidateException(messages);
        }

        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}