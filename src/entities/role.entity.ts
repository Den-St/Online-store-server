import {Field, ID, ObjectType} from "@nestjs/graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";

@ObjectType()
@Entity()
export class RoleEntity {
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
    @Field()
    @Column()
    value:string;
}