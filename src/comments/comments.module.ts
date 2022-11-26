import { UsersModule } from 'src/users/users.module';
import { ReviewsModule } from './../reviews/reviews.module';
import { CommentEntity } from './../entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [CommentsResolver, CommentsService],
  imports:[TypeOrmModule.forFeature([CommentEntity]),ReviewsModule,UsersModule,JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '30d' },
  }),]
})
export class CommentsModule {}
