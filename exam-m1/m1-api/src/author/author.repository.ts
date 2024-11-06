import { DataSource, Repository } from 'typeorm';
import { Author } from 'src/modules/database/entities/author.entity';
import { Injectable } from '@nestjs/common';
import { BookRepository } from 'src/book/book.repository';


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
    const defaultAuthor = await this.findOne({ where: { id: -1 } });

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
}