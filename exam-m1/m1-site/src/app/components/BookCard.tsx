import React from 'react';
import { Book } from '../models/book';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p className="text-gray-600">Author: {book.authorName}</p>
      <p className="text-gray-600">Price: ${book.price}</p>
      <p className="text-gray-600">Publish Year: {book.publishYear}</p>
    </div>
  );
};

export default BookCard;
