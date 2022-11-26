import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './../entities/review.entity';
import { ReviewsService } from './reviews.service';
import { Args, Mutation,Query, Resolver } from '@nestjs/graphql';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { GetReviewsDto } from './dto/get-reviews.dto';

@Resolver()
export class ReviewsResolver {
    constructor(private readonly reviewService:ReviewsService){}

    @UsePipes(ValidationPipe)
    @Roles('USER')
    @UseGuards(RoleGuard)
    @Mutation(() => ReviewEntity)
    async createReview(@Args('createReview') dto:CreateReviewDto):Promise<ReviewEntity> {
        return await this.reviewService.createAndSave(dto);
    }

    @Query(() => [ReviewEntity])
    async getReviews(@Args('getReviews') dto:GetReviewsDto):Promise<ReviewEntity[]> {
        return await this.reviewService.getReviews(dto);
    }
}


