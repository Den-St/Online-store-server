import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNumber, IsString } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import { FileUpload } from 'src/file-upload.dto';

@InputType()
export class ProductCreateDto {
  @IsNumber()
  @Field()
  categoryId: number;

  @IsString()
  @Field({ nullable: false })
  name: string;
  @IsNumber()
  @Field({ nullable: false })
  price: number;
  @IsNumber()
  @Field({ defaultValue: 0 })
  discountPrice: number;

  @IsNumber()
  @Field({ defaultValue: 0 })
  amountInStorage: number;

  @IsNumber()
  @Field({ nullable: false })
  sellerId: number;

  @IsString()
  @Field({ nullable: true })
  textDescription?: string;

  // @IsNumber()
  // @Field({ nullable: true })
  // mainProductId?: number;

  @IsArray()
  @Field(() => [Number])
  valuesIds: number[];

  @Field(() => [GraphQLUpload])
  images: FileUpload[];
}
