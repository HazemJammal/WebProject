// review.repository.ts
import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Review } from 'src/modules/database/entities/review.entity';
import { Book } from 'src/modules/database/entities/book.entity';
import { Author } from 'src/modules/database/entities/author.entity';

@Injectable()
export class ReviewRepository extends Repository<Review> {
  constructor(private dataSource: DataSource) {
    super(Review, dataSource.createEntityManager());
  }

  // Create and save a new review
  async createAndSaveReview(
    rating: number,
    reviewText: string,
    book: Book,
    author?: Author,
  ): Promise<Review> {
    const review = this.create({
      rating,
      reviewText,
      reviewDate: new Date(),
      book,
      author,
    });
    return await this.save(review);
  }

  // Find all reviews with related book and author
  async findAllReviews(): Promise<Review[]> {
    return await this.find({ relations: ['book', 'author'] });
  }

  async findReviewsByBookId(bookId: number): Promise<Review[]> {
    return await this.find({
      where: { book: { id: bookId } },
      relations: ['book', 'author'],
    });
  }

  // Calculate the average rating for an author
  async getAverageRatingForAuthor(authorId: number): Promise<number> {
    const reviews = await this.find({
      where: { author: { id: authorId } },
      relations: ['author'],
    });
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length ? total / reviews.length : 0;
  }

  async getAverageRatingForBook(bookId: number): Promise<number> {
    const reviews = await this.find({
      where: { book: { id: bookId } },
      relations: ['book'],
    });
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length ? total / reviews.length : 0;
  }

    async deleteReviewsByBookId(bookId: number): Promise<void> {
    await this.delete({ book: { id: bookId } }); // Delete reviews related to the book
  }
}