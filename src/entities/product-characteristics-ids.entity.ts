import {Field, ID, ObjectType} from "@nestjs/graphql";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@ObjectType()
@Entity()
export class CategoryEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @CreateDateColumn()
    createdAt: Date;
    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column()
    productTypeName:string;

    @Field()
    @Column()
    start: number;

    @Field()
    @Column()
    end: number;
}