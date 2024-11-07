export interface Author {
  id: number;
  firstname: string;
  lastname: string;
  photo: string;
  bookCount: number;
  averageRating: number;
}

export interface AddAuthor {
    firstname: string;
    lastname: string;
    photo: string;
    biography: string;
}
