import { ReceiptEntity } from './../entities/receipt.entity';
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ProductsService} from "./products.service";
import {ProductCreateDto} from "./dto/product-create.dto";
import {ProductEntity} from "../entities/product.entity";
import {ParseIntPipe, UseGuards, UsePipes} from '@nestjs/common';
import {AuthGuard} from "../guards/auth.guard";
import { ValidationPipe } from 'src/pipes/validation.pipe';
import {ProductBuyDto} from "./dto/product-buy.dto";
import {CompanyCreatorGuard} from "../guards/company-creator.guard";
import {Roles} from "../decorators/roles.decorator";
import {RoleGuard} from "../guards/role.guard";
import { AddToViewedProductsDto } from './dto/add-to-viewed-products.dto';
import { ProductFilterDto } from './dto/product-filter.dto';

@Resolver("Product")
export class ProductsResolver {
    constructor(private readonly productsService:ProductsService) {}

    @UseGuards(AuthGuard,CompanyCreatorGuard)
    @UsePipes(ValidationPipe)
    @Mutation(() => ProductEntity)
    async createProduct(@Args("createProduct") dto:ProductCreateDto):Promise<ProductEntity> {
        return await this.productsService.createProduct(dto);
    }

    @UsePipes(ValidationPipe)
    @Mutation(() => [ReceiptEntity])
    async buyProduct(@Args("buyProduct") dto:ProductBuyDto):Promise<ReceiptEntity[]> {
        return await this.productsService.buy(dto);
    }

    @Query(() => ProductEntity)
    async getOneProduct(@Args("getOneDetailedProductById",ParseIntPipe) id:number):Promise<ProductEntity> {
        return await this.productsService.getOne(id);
    }

    @Query(() => [ProductEntity])
    async getAllProducts():Promise<ProductEntity[]> {
        return await this.productsService.getAll();
    }

    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @Mutation(() => ProductEntity)
    async confirmProduct(@Args("confirmProduct",ParseIntPipe) id:number):Promise<ProductEntity>{
        return await this.productsService.confirmProduct(id);
    }
    
    @Query(() => [ProductEntity])
    async getProductsByCategory(@Args("getProductsByCategory") id:number):Promise<ProductEntity[]> {
        return await this.productsService.getProductsByCategory(id);
    }
    
    @Mutation(() => ProductEntity,{nullable:true})
    async addToViewedProducts(@Args("addToViewedProducts") dto:AddToViewedProductsDto):Promise<ProductEntity> {
        return await this.productsService.addToViewedProducts(dto);
    }

    @Mutation(() => ProductEntity,{nullable:true})
    async addToFavoriteProducts(@Args("addToFavoriteProducts") dto:AddToViewedProductsDto):Promise<ProductEntity> {
        return await this.productsService.addToFavoriteProducts(dto);
    }

    @Mutation(() => ProductEntity,{nullable:true})
    async deleteFromFavoriteProducts(@Args("deleteFromFavoriteProducts") dto:AddToViewedProductsDto):Promise<ProductEntity> {
        return await this.productsService.deleteFromFavoriteProducts(dto);
    }

    @Query(() => [ProductEntity])
    async filterProducts(@Args("filterProducts") dto:ProductFilterDto):Promise<ProductEntity[]> {
        return await this.productsService.filterProducts(dto);
    }

}
