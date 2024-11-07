// review.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
}