import { Author } from "./author";

export interface Book {
    id: number;
    title: string;
    price: number;
    publishYear: number;
    author: Author;
    authorName: string;
  }
