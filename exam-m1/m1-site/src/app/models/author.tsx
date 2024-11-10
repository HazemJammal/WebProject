import { Book } from "./book";

export interface Author {
  id: number;
  firstname: string;
  lastname: string;
  photo: string;
  bookCount: number;
  biography: string;
  averageRating: number;
}

export interface AddAuthor {
    firstname: string;
    lastname: string;
    photo: string;
    biography: string;
}


export interface AuthorDetails {
  id: number;
  firstname: string;
  lastname: string;
  photo: string;
  biography: string;
  books: Book[];
  averageRating: number;
}

export interface AuthorUpdate {
  firstname: string;
  lastname: string;
  photo: string;
  biography: string;  
}

export interface AuthorStats {
  id: number;
  firstname: string;
  lastname: string;
  photo: string;
  biography: string;
  bookCount: number;
  averageRating: number;}
  