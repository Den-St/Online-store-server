import { ChangeRatingDto } from './dto/change-rating.dto';
import { ReviewEntity } from './../entities/review.entity';
import { SearchProductsDto } from './dto/search-products.dto';
import { CartService } from 'src/cart/cart.service';
import { ReceiptEntity } from './../entities/receipt.entity';
import { ImageEntity } from 'src/entities/image.entity';
import { ImageService } from './../image/image.service';
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ProductEntity } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCreateDto } from './dto/product-create.dto';
import { CategoriesService } from '../categories/categories.service';
import { CompaniesService } from '../companies/companies.service';
import { CharacteristicsService } from '../characteristics/characteristics.service';
import { ProductBuyDto } from './dto/product-buy.dto';
import { ReceiptService } from '../receipt/receipt.service';
import { ProductConfirmBuyDto } from './dto/product-confirm-buy.dto';
import { generateUniqueFileName } from 'src/helpers/generateUniqueFileName';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { AddToViewedProductsDto } from './dto/add-to-viewed-products.dto';
import { UsersService } from 'src/users/users.service';
import { ProductFilterDto } from './dto/product-filter.dto';
import { GetAllDto } from './dto/get-all.dto';
import { GetProductsT } from './types/get-products.type';
import { In, Like} from "typeorm";
import { skip } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoriesService,
    private readonly companyService: CompaniesService,
    private readonly charService: CharacteristicsService,
    @Inject(forwardRef(() => ReceiptService))
    private readonly receiptService: ReceiptService,
    private readonly imageService:ImageService,
    private readonly cartService:CartService,
    private readonly userService:UsersService
  ) {}

  async createProduct(dto: ProductCreateDto): Promise<ProductEntity> {

    const seller = await this.companyService.getById(dto.sellerId);
    const category = await this.categoryService.getById(dto.categoryId);
    const characteristics =
      await this.charService.createCharacteristicPackForProduct(
        category.characteristics,
        dto.valuesIds,
      );
    const { sellerId, categoryId, valuesIds, images,...dto2 } = dto;

    const imagesEntities:ImageEntity[] = [];
  
    for(let i = 0;i < images.length;i++) {
      let {createReadStream, filename } = await dto.images[i];

      let uniqueFileName = generateUniqueFileName(filename);
      let stream = createReadStream();
      let pathName = join(process.cwd(), `./public/upload/${uniqueFileName}`);
      await stream.pipe(createWriteStream(pathName));
  
      let image = await this.imageService.create({
        url:`http://localhost:4000/upload/${uniqueFileName}`,
        isMain:i === 0
      });

      imagesEntities.push(image);
    }

    return await this.productRepository.save({
      name: dto2.name,
      price: dto2.price,
      amountInStorage: dto2.amountInStorage,
      seller: seller,
      textDescription: dto2.textDescription,
      category: category,
      characteristics: characteristics,
      potentialAmountInStorage: dto2.amountInStorage,
      images:imagesEntities
    });
  }

  async getAll(dto:GetAllDto): Promise<GetProductsT> {
    const skip = (dto.page - 1) * 10;
    const take = 10;
    console.log(dto.page)
    const products = await this.productRepository.findAndCount({
      relations: [
        'images'
      ],
      order:{id:"ASC"},
      skip:skip,
      take:take
    });
    
    return {
       products:products[0],
       total:products[1]
    }
  }

  async getOne(id: number): Promise<ProductEntity> {
    return await this.productRepository.findOne({
      where: { id },
      relations: [
        'characteristics',
        'characteristics.value',
        'characteristics.values',
        'category',
        'images',
        'seller',
        'seller.image'
      ],
    });
  }

  async buy(dto: ProductBuyDto):Promise<ReceiptEntity[]> {
    const receipts:ReceiptEntity[] = [];
    for(let i = 0;i < dto.cartItems.length;i++) {
      let prevProduct = await this.getOne(dto.cartItems[i].productId);
      if (prevProduct.amountInStorage - dto.cartItems[i].number < 0) {
        throw new HttpException(
          'not enough product at storage',
          HttpStatus.BAD_REQUEST,
        );
      }

      let receipt = await this.receiptService.create({productId:dto.cartItems[i].productId,buyerId:dto.buyerId,amountToBuy:dto.cartItems[i].number});
      receipts.push(receipt);
      await this.productRepository.save({
        ...prevProduct,
        potentialAmountInStorage:
          prevProduct.potentialAmountInStorage - dto.cartItems[i].number,
      });
    }
    await this.cartService.clearCart(dto.buyerId);
    return receipts;
  }

  async confirmBuy(dto: ProductConfirmBuyDto): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
      relations: [
        'characteristics',
        'characteristics.value',
        'characteristics.values',
        'category',
        'images'
      ],
    });

    return await this.productRepository.save({
      ...product,
      amountInStorage: product.amountInStorage - dto.amountToBuy,
    });
  }

  async declineBuy(dto: ProductConfirmBuyDto): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
      relations: [
        'characteristics',
        'characteristics.value',
        'characteristics.values',
        'category',
        'images'
      ],
    });

    return await this.productRepository.save({
      ...product,
      potentialAmountInStorage:
        product.potentialAmountInStorage + dto.amountToBuy,
    });
  }

  async confirmProduct(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: [
        'characteristics',
        'characteristics.value',
        'characteristics.values',
        'category',
        'images'
      ],
    });

    return await this.productRepository.save({ ...product, confirmed: true });
  }

  async getProductsByCategory(id:number):Promise<ProductEntity[]> {
    return await this.productRepository.find({
      where: { 'category':{
        id
      } },
      relations: [
        'characteristics',
        'characteristics.value',
        'characteristics.values',
        'category',
        'images'
      ],
    });
  };

  async addToViewedProducts(dto:AddToViewedProductsDto):Promise<ProductEntity> {
    const user = await this.userService.getUserWithRecentlyViewed(dto.userId);
    if(user.recentlyViewedProducts.findIndex(prod => prod.id === dto.productId) !== -1){
      return;
    }

    const product = await this.productRepository.findOne({where:{id:dto.productId}});

    if(user.recentlyViewedProducts.length < 10){
      await this.userService.saveUser({...user,recentlyViewedProducts:[product,...user.recentlyViewedProducts]});
      
      return product;
    }

    await this.userService.saveUser({...user,recentlyViewedProducts:[product,...user.recentlyViewedProducts.slice(0,9)]});

    return product;
  }

  async addToFavoriteProducts(dto:AddToViewedProductsDto):Promise<ProductEntity> {
    const user = await this.userService.getUserWithFavoriteProducts(dto.userId);
    if(user.favoriteProducts.findIndex(prod => prod.id === dto.productId) !== -1){
      return;
    }

    const product = await this.productRepository.findOne({where:{id:dto.productId}});
    await this.userService.saveUser({...user,favoriteProducts:[product,...user.favoriteProducts]});
    
    return product;
  }

  async deleteFromFavoriteProducts(dto:AddToViewedProductsDto):Promise<ProductEntity> {
    const user = await this.userService.getUserWithFavoriteProducts(dto.userId);
    if(user.favoriteProducts.findIndex(prod => prod.id === dto.productId) === -1){
      return;
    }

    const product = await this.productRepository.findOne({where:{id:dto.productId}});
    await this.userService.saveUser({...user,favoriteProducts:[...user.favoriteProducts.filter(prod => prod.id !== dto.productId)]});
    
    return product;
  }


  async filterProducts(dto:ProductFilterDto):Promise<GetProductsT> {
    const skip = (dto.page - 1) * 10;
    const take = 10;

    if(!dto.charValuesId.length) {
      const [productsByCategory,total] = await this.productRepository.findAndCount({
        where: { 'category':{
          'id':dto.categoryId
        }},
        relations: [
          'characteristics',
          'characteristics.value',
          'images'
        ],
        order:{[dto.orderRule.fieldName]:dto.orderRule.orderValue},
        skip:skip,
        take:take
      });
      return {
        products:productsByCategory,
        total:total
      }
    }


    const [filteredProducts,total] = await this.productRepository.findAndCount({
      where: { 'category':{
        'id':dto.categoryId
      },'characteristics':{
        'value':{
          "value":In(dto.charValuesId)
          }
      } },
      relations: [
        'characteristics',
        'characteristics.value',
        'images'
      ],
      order:{[dto.orderRule.fieldName]:dto.orderRule.orderValue},
      skip:skip,
      take:take
    });

    return {
        products: filteredProducts,
        total:total
      }
  }

  async searchProducts(dto:SearchProductsDto):Promise<GetProductsT> {
    if(!dto.productName) return {
      products:[],
      total:0
    }
    const skip = (dto.page - 1) * 10;
    const take = 10;
    const [products,total] =  await this.productRepository.findAndCount({
      where:{
        name:Like(`%${dto.productName}%`)
      },
      skip:skip,take:take,
      relations:["images"],
      order:{[dto.orderRule.fieldName]:dto.orderRule.orderValue},
    });

    return {
      products:products,
      total:total
    }
  }

  async changeProductRating(dto:ChangeRatingDto):Promise<ProductEntity> {
    const product = await this.productRepository.findOne({where:{id:dto.productId}});
    const newNumberOfRates = product.numberOfRates + 1;
    const newSumOfRates = product.sumOfRates + dto.rate;
    const newRating = Number((newSumOfRates/newNumberOfRates).toFixed(0));
    
    return await this.productRepository.save({...product,sumOfRates:newSumOfRates,
      numberOfRates:newNumberOfRates,rating:newRating});
  }
}
