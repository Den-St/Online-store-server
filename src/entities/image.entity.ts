import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@ObjectType()
@Entity()
export class ImageEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({})
    id: number;

    @Field()
    @CreateDateColumn()
    createdAt: Date;
    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column()
    url:string;

    @Field()
    @Column()
    isMain:boolean;

    @ManyToOne(() => ProductEntity,(product) => product.images)
    product:ProductEntity;
}