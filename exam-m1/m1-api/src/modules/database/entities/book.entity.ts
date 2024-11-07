import { Author } from "src/modules/database/entities/author.entity";
import { Column,Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Review } from "./review.entity";

@Entity('books')
export class Book  {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column('decimal')
    price: number;
  
    @Column()
    publishYear: number;
  
    @ManyToOne(() => Author, (author) => author.books, { eager: true })
    author: Author;
    @OneToMany(() => Review, (review) => review.book)
    reviews: Review[];
}