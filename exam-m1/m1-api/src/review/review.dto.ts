// create-review.dto.ts
export class CreateReviewDto {
    readonly rating: number;
    readonly reviewText?: string;
    readonly bookId: number;
    readonly authorId?: number;
  }