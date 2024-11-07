import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { BookRepository } from 'src/book/book.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/modules/database/entities/author.entity';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorRepository)
    private readonly authorRepository: AuthorRepository,

    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { firstname, lastname, photo, biography } = createAuthorDto;
    return await this.authorRepository.createAndSaveAuthor(firstname, lastname, photo, biography);
  }

  // Get all authors
  async getAllAuthors(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  // Get an author by ID
  async getAuthorById(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({ where: { id }, relations: ['books'] });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  // Update an author
  async updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.getAuthorById(id);

    const { firstname, lastname, photo, biography } = updateAuthorDto;

    // Update author fields
    if (firstname) author.firstname = firstname;
    if (lastname) author.lastname = lastname;
    if (photo) author.photo = photo;
    if (biography) author.biography = biography;

    return await this.authorRepository.save(author);
  }

  // Delete an author and update books to default author
  async deleteAuthor(id: number): Promise<void> {
    // Handle deletion of author and update their books
    await this.authorRepository.deleteAuthorAndUpdateBooks(id);
  }

  async getAuthorsWithStatistics() {
    return this.authorRepository.findAllWithStatistics();
  }
}