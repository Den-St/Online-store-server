import { GetCommentsDto } from './dto/get-comments.dto';
import { UsersService } from 'src/users/users.service';
import { ReviewsService } from './../reviews/reviews.service';
import { Repository } from 'typeorm';
import { CommentEntity } from './../entities/comment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(CommentEntity) private readonly commentRepository:Repository<CommentEntity>,
                private readonly reviewService:ReviewsService,
                private readonly userService:UsersService){}

    
    async createAndSave(dto:CreateCommentDto) {
        const newComment = await this.create(dto);

        const savedComment = await this.save(newComment);

        return savedComment;
    }
       
    async create(dto:CreateCommentDto) {
        const review = await this.reviewService.getOneByIdWithComments(dto.reviewId);
        const creator = await this.userService.getUserById(dto.creatorId);
        
        const newComment = await this.commentRepository.create({creator,commentToReview:review,text:dto.text,
            responseToCommentCreatorName:dto.responseToCommentCreatorName});

        return newComment;
    }

    async save(comment:CommentEntity) {
        const newComment = await this.commentRepository.save(comment);
        await this.reviewService.save({...newComment.commentToReview,comments:[...newComment.commentToReview.comments,newComment]});

        return newComment;
    }

    async getComments(dto:GetCommentsDto) {
        const comments = await this.commentRepository.find({where:{'commentToReview':{'id':dto.reviewId}},
        relations:['creator','commentToReview','commentToReview.creator'],skip:dto.skip,take:dto.limit});

        return comments;
    }
}
