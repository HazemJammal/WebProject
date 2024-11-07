import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/modules/database/entities/review.entity';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { BookRepository } from '../book/book.repository';
import { AuthorRepository } from '../author/author.repository';
import { BookModule } from '../book/book.module';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    BookModule,
    AuthorModule,
  ],
  providers: [ReviewService, ReviewRepository, BookRepository, AuthorRepository],
  controllers: [ReviewController],
})
export class ReviewModule {}