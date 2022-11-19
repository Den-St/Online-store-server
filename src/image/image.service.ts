import { ImageCreateDto } from './dto/image-create.dto';
import { ImageEntity } from './../entities/image.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
    constructor(@InjectRepository(ImageEntity) private readonly imageRepository:Repository<ImageEntity>){}

    async create(dto:ImageCreateDto):Promise<ImageEntity> {
        const image = await this.imageRepository.create({url:dto.url,isMain:dto.isMain});
        return await this.imageRepository.save(image);
    }
}
