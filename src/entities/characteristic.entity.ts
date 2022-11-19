import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CharacteristicValueEntity } from './characteristic-value.entity';

@ObjectType()
@Entity()
export class CharacteristicEntity {
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
  @Column({ unique: false })
  name: string;

  @ManyToMany((type) => CharacteristicValueEntity, (value) => value.id, {
    eager: true,
  })
  @Field(() => [CharacteristicValueEntity])
  @JoinTable()
  values: CharacteristicValueEntity[];

  @ManyToOne(() => CharacteristicValueEntity,{eager:true})
  @Field(() => CharacteristicValueEntity)
  @JoinTable()
  value: CharacteristicValueEntity;
}
