// src/app/models/review.ts
export interface Review {
    rating: number;
    reviewText?: string;
    bookId: number;
    authorId?: number;
    reviewDate: Date;
  }

  export interface AddReview{
    rating: number;
    reviewText?: string;
    bookId: number;
    authorId:number;
  }
