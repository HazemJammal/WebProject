// review.presenter.ts
import { Review } from 'src/modules/database/entities/review.entity';

export class ReviewPresenter {
  static present(review: Review) {
    return {
      id: review.id,
      rating: review.rating,
      reviewText: review.reviewText,
      reviewDate: review.reviewDate,
      bookId: review.book.id,
      authorId: review.author ? review.author.id : null,
    };
  }

  static presentMany(reviews: Review[]) {
    return reviews.map((review) => this.present(review));
  }
}