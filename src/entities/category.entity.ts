import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CharacteristicEntity } from './characteristic.entity';

@ObjectType()
@Entity()
export class CategoryEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ defaultValue: null, nullable: true })
  @Column({ nullable: true })
  parentId?: number | null;
  @Field()
  @Column()
  isMain: boolean;

  @Field()
  @Column()
  name: string;
  @Field()
  @Column()
  value: string;

  @ManyToMany(() => CharacteristicEntity)
  @Field(() => [CharacteristicEntity])
  @JoinTable()
  characteristics: CharacteristicEntity[];
}
