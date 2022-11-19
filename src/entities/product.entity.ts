import { CartItemEntity } from './cart-item.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';
import { CategoryEntity } from './category.entity';
import { CharacteristicEntity } from './characteristic.entity';
import { ImageEntity } from './image.entity';

@ObjectType()
@Entity()
export class ProductEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({})
  id: number;

//   @Field({ nullable: true })
//   @Column({ nullable: true })
//   mainProductId: number | null;

  @Field()
  @Column({ default: false })
  confirmed: boolean;

  @Field(() => CategoryEntity)
  @ManyToOne(() => CategoryEntity,{eager:true})
  @JoinTable()
  category: CategoryEntity;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: false })
  @Column({ nullable: false })
  name: string;
  @Field({ nullable: false })
  @Column({ nullable: false })
  price: number;
  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  discountPrice: number;
  @Field({ defaultValue: false })
  @Column({ default: false })
  isOnSale: boolean;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  amountInStorage: number;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  potentialAmountInStorage: number;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  rating: number;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  sumOfRates: number;
  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  numberOfRates: number;

  @Field(() => CompanyEntity)
  @ManyToOne(() => CompanyEntity,{eager:true})
  @JoinTable()
  seller: CompanyEntity;

  @Field(() => [CharacteristicEntity])
  @ManyToMany(() => CharacteristicEntity, (characteristic) => characteristic,{eager:true})
  @JoinTable()
  characteristics: CharacteristicEntity[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  textDescription: string;

  @Field()
  @Column({ default: 0 })
  popularity: number;

  @Field(() => [ImageEntity],{nullable:true})
  @OneToMany(() => ImageEntity,(images) => images.product,{eager:true})
  images:ImageEntity[]

  @Field(() => [CartItemEntity])
  @OneToMany(() => CartItemEntity,cartItem => cartItem.product)
  cartItems:CartItemEntity[]
}
