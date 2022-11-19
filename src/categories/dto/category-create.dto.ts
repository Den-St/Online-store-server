import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

@InputType()
export class CategoryCreateDto {
  @IsString()
  @Field()
  name: string;
  @IsString()
  @Field()
  value: string;
  @IsBoolean()
  @Field()
  isMain: boolean;

  // @IsNumber({})
  @Field({ defaultValue: null, nullable: true })
  parentId?: number | null;
}
