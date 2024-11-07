import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { BookRepository } from 'src/book/book.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/modules/database/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository, BookRepository],
})
export class AuthorModule {}