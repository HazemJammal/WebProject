import { DataSource, Repository } from 'typeorm';
import { Book } from 'src/modules/database/entities/book.entity';
import { Author } from 'src/modules/database/entities/author.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(private dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  async createAndSaveBook(title: string, price: number, publishYear: number, author: Author): Promise<Book> {
    const book = this.create({ title, price, publishYear, author });
    return await this.save(book);
  }

  async findBookById(id: number): Promise<Book | undefined> {
    return await this.findOne({ where: { id }, relations: ['author'] });
  }

  async updateBook(book: Book, title: string, price: number, publishYear: number): Promise<Book> {
    book.title = title;
    book.price = price;
    book.publishYear = publishYear;
    return await this.save(book);
  }

  async deleteBook(id: number): Promise<void> {
    await this.delete(id);
  }
}