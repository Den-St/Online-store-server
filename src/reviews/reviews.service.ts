import { GetReviewsDto } from './dto/get-reviews.dto';
import { ProductsService } from './../products/products.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ReviewEntity } from './../entities/review.entity';
import { Injectable, } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
    constructor(@InjectRepository(ReviewEntity) private readonly reviewRepository:Repository<ReviewEntity>,
                private readonly usersService:UsersService,
                private readonly productService:ProductsService){}
    
    
    async createAndSave(dto:CreateReviewDto):Promise<ReviewEntity> {
        const review = await this.create(dto);
        return await this.save(review);
    }           

    async create(dto:CreateReviewDto):Promise<ReviewEntity> {
        const user = await this.usersService.getUserById(dto.userId);
        const product = await this.productService.getOne(dto.productId);

        const review =  await this.reviewRepository.create({creator:user,product:product,
            text:dto.text,consText:dto.consText,
            prosText:dto.prosText,rate:dto.rate,comments:[]});

        await this.productService.changeProductRating({rate:review.rate,productId:dto.productId});

        return review;
    }
    
    async save(review:ReviewEntity):Promise<ReviewEntity> {
        const newReview = await this.reviewRepository.save(review);
        return newReview;
    }

    async getReviews(dto:GetReviewsDto):Promise<ReviewEntity[]> {
        const reviews = await this.reviewRepository.find({where:{'product':{'id':dto.productId}},relations:['creator'],skip:dto.skip,take:dto.limit});

        return reviews;
    }

    async getOneById(id:number) {
        return await this.reviewRepository.findOne({where:{id}});
    }
    async getOneByIdWithCreator(id:number) {
        return await this.reviewRepository.findOne({where:{id},relations:['creator']});
    }
    async getOneByIdWithComments(id:number) {
        return await this.reviewRepository.findOne({where:{id},relations:['comments']});
    }
}
