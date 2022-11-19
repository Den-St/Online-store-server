import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ReceiptEntity} from "../entities/receipt.entity";
import {Repository} from "typeorm";
import {ProductsService} from "../products/products.service";
import {UsersService} from "../users/users.service";
import {ReceiptCreateDto} from "./dto/receipt-create.dto";

@Injectable()
export class ReceiptService {
    constructor(@InjectRepository(ReceiptEntity) private readonly receiptRepository:Repository<ReceiptEntity>,
                @Inject(forwardRef(() => ProductsService)) private readonly productService:ProductsService,
                private readonly userService:UsersService) {}

    async create(dto:ReceiptCreateDto):Promise<ReceiptEntity> {
        const user = await this.userService.getUserById(dto.buyerId);
        const product = await this.productService.getOne(dto.productId);

        return await this.receiptRepository.save({buyer:user,product:product,amountToBuy:dto.amountToBuy});
    }

    async getOne(id:number):Promise<ReceiptEntity>{
        return await this.receiptRepository.findOne({
            where:{id},
            relations:["buyer","product"]
        })
    }

    async getAll():Promise<ReceiptEntity[]> {
        return await this.receiptRepository.find({
            relations:["buyer","product"]
        });
    }

    async getAllByUserId(id:number):Promise<ReceiptEntity[]> {
        const buyer = await this.userService.getUserById(id);
        console.log("ccc",buyer.receipts);

        return buyer.receipts;
    }

    async confirmReceipt(id:number):Promise<ReceiptEntity> {
        const receipt = await this.receiptRepository.findOne({
            where:{id:id},
            relations:["buyer","product"]
        });
        if(receipt.status !== "Not confirmed") throw new HttpException("receipt status already "+receipt.status ,HttpStatus.BAD_REQUEST);

        await this.productService.confirmBuy({productId:receipt.buyer.id,
            amountToBuy:receipt.amountToBuy});

        return this.receiptRepository.save({...receipt,status:"Confirmed"});
    }

    async declineReceipt(id:number):Promise<ReceiptEntity> {
        const receipt = await this.receiptRepository.findOne({
            where:{id:id},
            relations:["buyer","product"]
        });
        if(receipt.status !== "Not confirmed") throw new HttpException("receipt status already "+receipt.status,HttpStatus.BAD_REQUEST);

        await this.productService.declineBuy({productId:receipt.buyer.id,
            amountToBuy:receipt.amountToBuy});

        return this.receiptRepository.save({...receipt,status:"Declined"});
    }
}
