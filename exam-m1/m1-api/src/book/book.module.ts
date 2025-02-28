import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DatabaseModule } from 'src/modules/database/database.module';
import { Book } from 'src/modules/database/entities/book.entity';
import { Author } from 'src/modules/database/entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { AuthorRepository } from 'src/author/author.repository';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Book, Author]),
  ],
  providers: [BookService, BookRepository, AuthorRepository],
  controllers: [BookController],
  exports: [BookRepository], // Export BookRepository to be used in other modules
})
export class BookModule {}