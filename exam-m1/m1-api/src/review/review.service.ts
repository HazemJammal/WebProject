// review.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { BookRepository } from '../book/book.repository';
import { AuthorRepository } from '../author/author.repository';
import { CreateReviewDto } from './review.dto';
import { Review } from 'src/modules/database/entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly bookRepository: BookRepository,
    private readonly authorRepository: AuthorRepository,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const { rating, reviewText, bookId, authorId } = createReviewDto;

    // Ensure the book exists
    const book = await this.bookRepository.findBookById(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    // Ensure the author exists if authorId is provided
    let author = null;
    if (authorId) {
      author = await this.authorRepository.findAuthorById(authorId);
      if (!author) {
        throw new NotFoundException(`Author with ID ${authorId} not found`);
      }
    }

    // Use the repository to create and save the review
    return await this.reviewRepository.createAndSaveReview(
      rating,
      reviewText || '',
      book,
      author,
    );
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewRepository.findAllReviews();
  }

  
  async getReviewsByBookId(bookId: number): Promise<Review[]> {
    return await this.reviewRepository.findReviewsByBookId(bookId);
  }
  async getAverageRatingForAuthor(authorId: number): Promise<number> {
    return await this.reviewRepository.getAverageRatingForAuthor(authorId);
  }

    async deleteReviewsByBookId(bookId: number): Promise<void> {
    await this.reviewRepository.deleteReviewsByBookId(bookId);
  }

  async getAverageRatingForBook(bookId: number): Promise<number> {
    return await this.reviewRepository.getAverageRatingForBook(bookId);
  }
}