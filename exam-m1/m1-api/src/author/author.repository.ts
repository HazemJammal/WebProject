import { DataSource, Repository } from 'typeorm';
import { Author } from 'src/modules/database/entities/author.entity';
import { Injectable } from '@nestjs/common';
import { BookRepository } from 'src/book/book.repository';
import { AuthorStats } from './author.dto';


@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(private dataSource: DataSource,private bookRepository: BookRepository) {
    super(Author, dataSource.createEntityManager());
  }
  async createAndSaveAuthor(firstname: string,lastname: string,photo: string,biography: string): Promise<Author> {
    const author = this.create({ firstname, lastname, photo, biography });
    return await this.save(author);
  }
  async findAuthorById(id: number): Promise<Author | undefined> {
    return await this.findOne({ where: { id }});
  }
  async updateAuthor(author: Author, firstname?: string, lastname?: string, photo?: string, biography?: string): Promise<Author> {
    // Update the author fields if provided
    if (firstname) author.firstname = firstname;
    if (lastname) author.lastname = lastname;
    if (photo) author.photo = photo;
    if (biography) author.biography = biography;
  
    // Save and return the updated author
    return await this.save(author);
  }
  
  async deleteAuthorAndUpdateBooks(authorId: number): Promise<void> {
    const author = await this.findOne({ where: { id: authorId }, relations: ['books'] });

    // Get the default author (id = -1)
    const defaultAuthor = await this.findOne({ where: { id: 2 } });

    if (!defaultAuthor) {
      throw new Error('Default author with ID -1 not found');
    }

    // Update all books of the author to have the default author
    for (const book of author.books) {
      book.author = defaultAuthor;
      await this.bookRepository.save(book);
    }

    // Delete the author
    await this.delete(authorId);
  }

  async findAllWithStatistics(): Promise<Array<AuthorStats>> {
    // Fetch authors with their books and reviews
    const authors = await this.find({ relations: ['books', 'books.reviews'] });
  
    // Map through authors and calculate statistics
    return authors.map((author) => {
      const bookCount = author.books.length;
  
      // Collect all reviews across books
      const totalReviews = author.books.flatMap((book) => book.reviews);
  
      // Calculate total rating sum from all reviews
      const totalRating = totalReviews.reduce((sum, review) => sum + review.rating, 0);
  
      // Calculate average rating, default to 0 if no reviews
      const averageRating = totalReviews.length ? totalRating / totalReviews.length : 0;
  
      // Return the calculated statistics along with basic author info
      return new AuthorStats(
        author.id,
        author.firstname,
        author.lastname,
        author.photo,
        author.biography,
        bookCount,
        averageRating
      );
    });
  }
  
}