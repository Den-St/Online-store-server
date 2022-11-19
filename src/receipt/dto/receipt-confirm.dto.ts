import {Field, InputType} from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class ReceiptConfirmDto {
    @IsNumber()
    @Field()
    receiptId:number;
}