
export interface Book {
    id: number;
    title: string;
    price: number;
    publishYear: number;
    authorName: string;
  }

  export interface AddBook{
    title: string;
    price: number;
    publishYear: number;
    authorId: number;
  }

  export interface BookDetailModel extends Book {
    authorId: number;
  }