import { ProductEntity } from 'src/entities/product.entity';
import { ReceiptEntity } from './receipt.entity';
import { CartEntity } from './cart.entity';
import {
    Column,
    CreateDateColumn,
    Entity, JoinTable, ManyToMany, OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Field, ID, ObjectType} from "@nestjs/graphql";
import {RoleEntity} from "./role.entity";
import {JoinColumn} from "typeorm";
import {CompanyEntity} from "./company.entity";

@ObjectType()
@Entity()
export class UserEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({})
    id:number;

    @Field()
    @CreateDateColumn()
    createdAt:Date;
    @Field()
    @UpdateDateColumn()
    updatedAt:Date;

    @Field()
    @Column()
    email:string;
    @Field()
    @Column()
    phoneNumber:string;
    @Field()
    @Column()
    name:string;

    @Field()
    @Column()
    password:string;

    @ManyToMany(() => RoleEntity)
    @Field(() => [RoleEntity],{nullable:true})
    @JoinTable()
    roles:RoleEntity[];

    @OneToMany(() => CompanyEntity,company => company.creator,{eager:true})
    @Field(() => [CompanyEntity])
    @JoinTable()
    companies:CompanyEntity[];

    @Field(() => CartEntity)
    @OneToOne(() => CartEntity,{eager:true})
    @JoinColumn()
    cart:CartEntity;

    @Field(() => [ReceiptEntity])
    @OneToMany(() => ReceiptEntity,(receipt) => receipt.buyer,{eager:true})
    @JoinColumn()
    receipts:ReceiptEntity[]

    @Field(() => [ProductEntity])
    @ManyToMany(() => ProductEntity,{eager:true,nullable:true})
    @JoinTable()
    recentlyViewedProducts:ProductEntity[];

    @Field(() => [ProductEntity])
    @ManyToMany(() => ProductEntity,{eager:true,nullable:true})
    @JoinTable()
    favoriteProducts:ProductEntity[]
};