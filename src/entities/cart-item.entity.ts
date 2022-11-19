import { ProductEntity } from 'src/entities/product.entity';
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CartEntity } from './cart.entity';

@ObjectType()
@Entity()
export class CartItemEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;
  
    @Field()
    @CreateDateColumn()
    createdAt: Date;
    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => ProductEntity)
    @ManyToOne(() => ProductEntity,{nullable:true,eager:true})
    @JoinTable()
    product:ProductEntity;

    @Field({defaultValue:1})
    @Column({default:1})
    number:number;

    @Field(() => CartEntity,{nullable:true})
    @ManyToOne(() => CartEntity,(cart) => cart.cartItems,{nullable:true})
    cart:CartEntity;
}