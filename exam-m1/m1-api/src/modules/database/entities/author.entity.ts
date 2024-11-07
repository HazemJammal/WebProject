import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';
import { Review } from './review.entity';

@Entity()
export class Author  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  photo: string;

  @Column()
  biography: string;
  
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
  @OneToMany(() => Review, (review) => review.author)
  reviews: Review[];
}
