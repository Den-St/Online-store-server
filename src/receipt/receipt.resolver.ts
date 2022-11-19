import {Args, Mutation, Resolver,Query} from '@nestjs/graphql';
import {ReceiptService} from "./receipt.service";
import {ReceiptEntity} from "../entities/receipt.entity";
import {ReceiptCreateDto} from "./dto/receipt-create.dto";
import {ProductEntity} from "../entities/product.entity";

@Resolver("Receipt")
export class ReceiptResolver {
    constructor(private readonly receiptService:ReceiptService) {}

    @Mutation(() => ReceiptEntity)
    async createReceipt(@Args("createReceipt") dto:ReceiptCreateDto):Promise<ReceiptEntity> {
        return await this.receiptService.create(dto);
    }

   @Query(() => [ReceiptEntity])
    async getAllReceipts():Promise<ReceiptEntity[]>{
        return await this.receiptService.getAll();
   }

    @Query(() => ReceiptEntity)
    async getOneReceiptById(@Args("getOneReceiptById") id:number):Promise<ReceiptEntity>{
        return await this.receiptService.getOne(id);
    }

    @Query(() => [ReceiptEntity])
    async getAllReceiptsByUserId(@Args("getAllReceiptsByUserId") userId:number):Promise<ReceiptEntity[]>{
        return await this.receiptService.getAllByUserId(userId);
    }

    @Mutation(() => ReceiptEntity)
    async confirmReceipt(@Args("confirmReceipt") id:number):Promise<ReceiptEntity> {
        return await this.receiptService.confirmReceipt(id);
    }

    @Mutation(() => ReceiptEntity)
    async declineReceipt(@Args("declineReceipt",) id:number):Promise<ReceiptEntity> {
        return await this.receiptService.declineReceipt(id);
    }
}
