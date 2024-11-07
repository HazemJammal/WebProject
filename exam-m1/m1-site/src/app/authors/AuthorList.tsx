'use client';
import React, { useState } from 'react';
import AuthorCard from '../components/AuthorCard';
import { Author } from '../models/author';

interface AuthorListProps {
  authors: Author[];
  addAuthor: () => void; // Function to open the modal for adding a new author
}

const AuthorList: React.FC<AuthorListProps> = ({ authors, addAuthor }) => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state

  // Filter authors based on the search query
  const filteredAuthors = authors.filter((author) =>
    `${author.firstname} ${author.lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search authors by name"
          className="p-2 border border-gray-300 rounded-md w-1/2"
        />
      </div>

      {/* Author Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuthors.length > 0 ? (
          filteredAuthors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))
        ) : (
          <div>No authors found</div>
        )}
      </div>

      {/* Add Author Button */}
      <button
        className="fixed bottom-10 right-10 p-4 bg-purple-600 text-white rounded-full hover:bg-purple-700"
        onClick={addAuthor} // Opens the modal
      >
        +
      </button>
    </div>
  );
};

export default AuthorList;
