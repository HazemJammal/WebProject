import { Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { Book } from 'src/modules/database/entities/book.entity';
import { AuthorRepository } from 'src/author/author.repository';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,

    private readonly authorRepository: AuthorRepository,
  ) {}

  // Create a new book
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, price, publishYear, authorId } = createBookDto;
  
    // Check if the author exists
    const author = await this.authorRepository.findAuthorById(authorId);
    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }
  
    // Delegate to repository for database operation
    return this.bookRepository.createAndSaveBook(title, price, publishYear, author);
  }
  
  // Find a book by ID
  async getBookById(id: number): Promise<Book> {
    const book = await this.bookRepository.findBookById(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  // Get all books
  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.find({ relations: ['author'] });
  }

  // Update a book
  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const { title, price, publishYear } = updateBookDto;

    // Find the existing book
    const book = await this.getBookById(id);

    // Delegate to repository for update operation
    return this.bookRepository.updateBook(book, title, price, publishYear);
  }

  // Delete a book by ID
  async deleteBook(id: number): Promise<void> {
    // Ensure the book exists before deleting
    const book = await this.getBookById(id);
    await this.bookRepository.deleteBook(book.id);
  }
}
