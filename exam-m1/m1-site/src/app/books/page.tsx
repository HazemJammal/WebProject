'use client';

import React, { useState } from 'react';
import BookList from './BookList'; // Assuming this lists the books
import AddBookModal from '../components/AddBookModal'; // Assuming you have a Modal component
import BookForm from '../components/BookForm'; // Assuming you have a BookForm component
import { BookProvider, useBooks } from '../providers/BookProvider';
import { AddBook } from '../models/book';

export default function Books() {
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle modal for adding a new book

  // Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <BookProvider>
      <BooksContent closeModal={closeModal} openModal={openModal} isModalOpen={isModalOpen} />
    </BookProvider>
  );
}

const BooksContent = ({ closeModal, openModal, isModalOpen }: any) => {
  const { books, addBook } = useBooks(); // Using the useBooks hook

  // Handle adding a new book
  const handleAddBook = async (newBookData: AddBook) => {
    await addBook(newBookData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">Books Page</h1>
      
      {/* BookList component */}
      <BookList books={books} addBook={openModal} />

      {/* Modal for adding a new book */}
      {isModalOpen && (
        <AddBookModal closeModal={closeModal}>
          <BookForm closeModal={closeModal} addBook={handleAddBook} />
        </AddBookModal>
      )}
    </div>
  );
};
