export class CreateBookDto {
    title: string;
    price: number;
    publishYear: number;
    authorId: number;
}

export class UpdateBookDto {
    title?: string;
    price?: number;
    publishYear?: number;
    authorId?: number;
  }