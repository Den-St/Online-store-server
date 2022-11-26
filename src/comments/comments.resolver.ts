import { GetCommentsDto } from './dto/get-comments.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './../entities/comment.entity';
import { CommentsService } from './comments.service';
import { Args, Mutation,Query, Resolver } from '@nestjs/graphql';
import {  } from '@nestjs/common';

@Resolver()
export class CommentsResolver {
    constructor(private readonly commentService:CommentsService){}


    @Mutation(() => CommentEntity)
    async createComment(@Args('createComment') dto:CreateCommentDto) {
        return await this.commentService.createAndSave(dto);
    }

    @Query(() => [CommentEntity])
    async getComments(@Args('getComments') dto:GetCommentsDto) {
        return await this.commentService.getComments(dto);
    }
}
