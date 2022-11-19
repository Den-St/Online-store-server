import {Field, ID, ObjectType} from "@nestjs/graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {CategoryEntity} from "./category.entity";
import {UserEntity} from "./user.entity";
import {ProductEntity} from "./product.entity";

@ObjectType()
@Entity()
export class ReceiptEntity{
    @Field(() => ID)
    @PrimaryGeneratedColumn({})
    id:number;

    @Field()
    @CreateDateColumn()
    createdAt:Date;
    @Field()
    @UpdateDateColumn()
    updatedAt:Date;

    @ManyToOne(() => UserEntity,buyer => buyer.receipts)
    @JoinTable()
    @Field(() => UserEntity)
    buyer:UserEntity;

    @ManyToOne(() => ProductEntity,{eager:true})
    @JoinTable()
    @Field(() => ProductEntity)
    product:ProductEntity;

    @Field()
    @Column({default:"Not confirmed"})
    status:string;

    @Field()
    @Column()
    amountToBuy:number;
}