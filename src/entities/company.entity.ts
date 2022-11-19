import { ImageEntity } from 'src/entities/image.entity';
import {Field, ID, ObjectType} from "@nestjs/graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";

@ObjectType()
@Entity()
export class CompanyEntity{
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
    name:string;

    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity,creator => creator.companies)
    @JoinTable()
    creator:UserEntity;

    @Field(() => ImageEntity)
    @OneToOne(() => ImageEntity,{eager:true})
    @JoinColumn()
    image:ImageEntity;
}