import React from 'react';
import { Book } from '../models/book';
import BookCard from '../components/BookCard';

interface BookListProps {
  books: Book[];
  addBook: () => void; // Function to open the modal for adding a new book
}

const BookList: React.FC<BookListProps> = ({ books, addBook }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.length > 0 ? (
        books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))
      ) : (
        <div>No books found</div>
      )}
      <button
        className="fixed bottom-10 right-10 p-4 bg-blue-500 text-white rounded-full hover:bg-blue-700"
        onClick={addBook} // Opens the modal
      >
        +
      </button>
    </div>
  );
};

export default BookList;
