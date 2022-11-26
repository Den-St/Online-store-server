import { ReviewEntity } from './review.entity';
import { Field, ID, ObjectType } from "@nestjs/graphql";
import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne,JoinTable} from "typeorm";
import { UserEntity } from "./user.entity";

@ObjectType()
@Entity()
export class CommentEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id:number;

    @Field()
    @CreateDateColumn()
    createdAt:Date;

    @Field()
    @UpdateDateColumn()
    updatedAt:Date;

    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity,user => user.reviews)
    @JoinTable()
    creator:UserEntity;

    @Field()
    @Column()
    text:string;

    @Field(() => ReviewEntity)
    @ManyToOne(() => ReviewEntity,review => review.comments)
    @JoinTable()
    commentToReview:ReviewEntity;//review

    @Field({defaultValue:0})
    @Column({default:0})
    responseToCommentCreatorName:string;//comment creator name
}