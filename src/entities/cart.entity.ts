import { CartItemEntity } from './cart-item.entity';
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class CartEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CartItemEntity,(cartItem) => cartItem.cart,{eager:true,nullable:true})
  @Field(() => [CartItemEntity],{nullable:true})
  @JoinTable()
  cartItems:CartItemEntity[];
}