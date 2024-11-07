import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import { Book } from '../models/book';
import Link from 'next/link';

interface BookListProps {
  books: Book[];
  addBook: () => void; // Function to open the modal for adding a new book
}

const BookList: React.FC<BookListProps> = ({ books, addBook }) => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state
  const [sortOption, setSortOption] = useState<string>('nameAsc'); // Sort option state

  // Filter books based on the search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting function
  const sortBooks = (books: Book[]) => {
    switch (sortOption) {
      case 'nameAsc':
        return books.sort((a, b) => a.title.localeCompare(b.title));
      case 'nameDesc':
        return books.sort((a, b) => b.title.localeCompare(a.title));
      case 'dateAsc':
        return books.sort((a, b) => a.publishYear - b.publishYear);
      case 'dateDesc':
        return books.sort((a, b) => b.publishYear - a.publishYear);
      case 'priceAsc':
        return books.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return books.sort((a, b) => b.price - a.price);

      default:
        return books;
    }
  };

  // Sorted books
  const sortedBooks = sortBooks(filteredBooks);

  return (
    <div className="space-y-4">
      {/* Search Bar and Sorting Dropdown side by side */}
      <div className="flex justify-between mb-4">
        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search books by name"
          className="p-2 border border-gray-300 rounded-md w-3/4"
        />

        {/* Sorting Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border border-gray-300 rounded-md ml-4 w-1/4 md:w-1/4"
        >
          <option value="nameAsc">Sort by Name (A-Z)</option>
          <option value="nameDesc">Sort by Name (Z-A)</option>
          <option value="dateAsc">Sort by Date (Ascending)</option>
          <option value="dateDesc">Sort by Date (Descending)</option>
          <option value="priceAsc">Sort by Price (Low to High)</option>
          <option value="priceDesc">Sort by Price (High to Low)</option>
        </select>
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBooks.length > 0 ? (
          sortedBooks.map((book) => (
            <Link href={`/books/${book.id}`} key={book.id}>
            <BookCard key={book.id} book={book} />
            </Link> 
          ))
        ) : (
          <div>No books found</div>
        )}
      </div>

      {/* Add Book Button */}
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