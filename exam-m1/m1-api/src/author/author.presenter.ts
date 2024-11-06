import { Author } from "src/modules/database/entities/author.entity";

export class AuthorPresenter {
    id: number;
    firstname: string;
    lastname: string;
    photo: string;
    biography: string;
  
    constructor(author: Author) {
      this.id = author.id;
      this.firstname = author.firstname;
      this.lastname = author.lastname;
      this.photo = author.photo;
      this.biography = author.biography;
    }
  }
  