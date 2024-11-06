import { Book } from "src/modules/database/entities/book.entity";

export class BookPresenter {
    /**
     * Format a single book object for presentation.
     * @param book The book entity to format.
     * @returns A formatted book object.
     */
    static present(book: Book) {
      return {
        id: book.id,
        title: book.title,
        price: book.price,
        publishYear: book.publishYear,
        authorName: book.author ? book.author.firstname + " " +book.author.lastname : null,  // assuming the Book entity has an Author relation
      };
    }
  
    /**
     * Format an array of books for presentation.
     * @param books Array of book entities.
     * @returns An array of formatted book objects.
     */
    static presentMany(books: Book[]) {
      return books.map((book) => this.present(book));
    }
  }