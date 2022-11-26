import {Field, ID, ObjectType} from "@nestjs/graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
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

    @ManyToOne(() => ProductEntity)
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