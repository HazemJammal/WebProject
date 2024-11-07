// review.controller.ts
import { Controller, Get, Post, Body, Param, Delete, NotFoundException } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewPresenter } from './review.presenter';
import { CreateReviewDto } from './review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    const review = await this.reviewService.create(createReviewDto);
    return ReviewPresenter.present(review);
  }

  @Get()
  async findAll() {
    const reviews = await this.reviewService.findAll();
    return ReviewPresenter.presentMany(reviews);
  }

  @Get('author/:authorId/average-rating')
  async getAverageRating(@Param('authorId') authorId: number) {
    const averageRating = await this.reviewService.getAverageRatingForAuthor(Number(authorId));
    return { averageRating };
  }

  @Delete(':id')
  async deleteReviews(@Param('id') bookId: number): Promise<void> {
    await this.reviewService.deleteReviewsByBookId(bookId);
  }

  @Get('book/:bookId/average-rating')
  async getAverageRatingForBook(@Param('bookId') bookId: number) {
    const averageRating = await this.reviewService.getAverageRatingForBook(bookId);
    if (averageRating === 0) {
      throw new NotFoundException(`No ratings found for book ID ${bookId}`);
    }
    return { averageRating };
  }


}