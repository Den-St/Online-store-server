import { ImageService } from './image.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ImageEntity } from 'src/entities/image.entity';
import { ImageCreateDto } from './dto/image-create.dto';

@Resolver("image")
export class ImageResolver {
    constructor(private readonly imageService:ImageService) {}

    @Mutation(() => ImageEntity)
    async createImage(@Args("createImage") dto:ImageCreateDto):Promise<ImageEntity> {
        return await this.imageService.create(dto);
    }
}
