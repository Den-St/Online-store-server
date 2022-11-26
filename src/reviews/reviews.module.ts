import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { ReviewEntity } from './../entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [ReviewsResolver, ReviewsService],
  imports:[TypeOrmModule.forFeature([ReviewEntity]),UsersModule,ProductsModule,
  JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '30d' },
  }),],
  exports:[ReviewsService]
})
export class ReviewsModule {}
