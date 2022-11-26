import { CommentEntity } from './comment.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';
import { Field, ObjectType,ID } from "@nestjs/graphql";
import {Entity,ManyToOne,JoinTable,Column,OneToMany,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from "typeorm";

@ObjectType()
@Entity()
export class ReviewEntity {
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

    @Field(() => ProductEntity)
    @ManyToOne(() => ProductEntity,product => product.reviews)
    product:ProductEntity;

    @Field()
    @Column()
    consText:string;

    @Field()
    @Column()
    prosText:string;

    @Field()
    @Column()
    rate:number;

    @Field(() => [CommentEntity])
    @OneToMany(() => CommentEntity,comment => comment.commentToReview,{nullable:true})
    comments:CommentEntity[]
}