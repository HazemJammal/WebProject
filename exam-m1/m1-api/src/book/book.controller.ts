import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { BookPresenter } from './book.presenter';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // Create a new book
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto) {
    const book = await this.bookService.createBook(createBookDto);
    return BookPresenter.present(book);  // Use the presenter to format the response
  }

  // Get all books
  @Get()
  async getAllBooks() {
    const books = await this.bookService.getAllBooks();
    return BookPresenter.presentMany(books);  // Use the presenter to format the response
  }

  // Get a book by ID
  @Get(':id')
  async getBookById(@Param('id') id: number) {
    const book = await this.bookService.getBookById(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return BookPresenter.present(book);  // Use the presenter to format the response
  }

  // Update a book
  @Put(':id')
  async updateBook(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const updatedBook = await this.bookService.updateBook(id, updateBookDto);
    return BookPresenter.present(updatedBook);  // Use the presenter to format the response
  }

  // Delete a book by ID
  @Delete(':id')
  async deleteBook(@Param('id') id: number) {
    await this.bookService.deleteBook(id);
    return { message: `Book with ID ${id} deleted successfully` };
  }
}