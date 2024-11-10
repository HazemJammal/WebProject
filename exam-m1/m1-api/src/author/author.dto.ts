export class CreateAuthorDto {
    firstname: string;
    lastname: string;
    photo: string;
    biography: string;
  }

  export class UpdateAuthorDto {
    firstname?: string;
    lastname?: string;
    photo?: string;
    biography?: string;
  }

  export class AuthorStats {
    id: number;
    firstname: string;
    lastname: string;
    photo: string;
    biography: string;
    bookCount: number;
    averageRating: number;
  
    constructor(
      id: number,
      firstname: string,
      lastname: string,
      photo: string,
      biography: string,
      bookCount: number,
      averageRating: number
    ) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.photo = photo;
      this.biography = biography;
      this.bookCount = bookCount;
      this.averageRating = averageRating;
    }
  }