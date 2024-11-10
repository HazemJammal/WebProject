import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorPresenter } from './author.presenter';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  // Create Author
  @Post()
  async createAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<AuthorPresenter> {
    const newAuthor = await this.authorService.createAuthor(createAuthorDto);
    return new AuthorPresenter(newAuthor);
  }
  // Get all authors
  @Get('stats')
  async findAllWithStatistics() {
    return await this.authorService.getAuthorsWithStatistics();
  }
  @Get()
  async getAllAuthors(): Promise<AuthorPresenter[]> {
    const authors = await this.authorService.getAllAuthors();
    return authors.map(author => new AuthorPresenter(author));
  }

  // Get an author by ID
  @Get(':id')
  async getAuthorById(@Param('id', ParseIntPipe) id: number): Promise<AuthorPresenter> {
    const author = await this.authorService.getAuthorById(id);
    return new AuthorPresenter(author);
  }

  // Update an author
  @Put(':id')
  async updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorDto: UpdateAuthorDto
  ): Promise<AuthorPresenter> {
    const updatedAuthor = await this.authorService.updateAuthor(id, updateAuthorDto);
    return new AuthorPresenter(updatedAuthor);
  }

  // Delete an author
  @Delete(':id')
  async deleteAuthor(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.authorService.deleteAuthor(id);
  }
}