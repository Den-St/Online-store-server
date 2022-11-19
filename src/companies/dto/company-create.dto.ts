import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import { FileUpload } from 'src/file-upload.dto';

@InputType()
export class CompanyCreateDto {
  @IsString()
  @Field()
  name: string;

  @IsNumber()
  @Field()
  creatorId: number;

  @Field(() => GraphQLUpload)
  image: FileUpload;
}
