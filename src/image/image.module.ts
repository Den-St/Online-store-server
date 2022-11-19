import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from 'src/entities/image.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ImageEntity])],
  providers: [ImageService, ImageResolver],
  exports:[
    ImageService
  ]
})
export class ImageModule {}
