'use client';

import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import { Book } from '../models/book'; // Updated Book type
import Modal from '../components/AddBookModal'; // Assuming you have a Modal component
import BookForm from '../components/BookForm'; // Assuming you have a BookForm component

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]); // State to hold the list of books
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle modal for adding a new book

  // Fetch books when the page loads
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3001/books');
        const data = await response.json();
        setBooks(data); // Set books state with fetched data
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  // Handle adding a new book (optimistic UI)
  const handleAddBook = async (newBookData: {
    title: string;
    price: number;
    publishYear: number;
    authorName: string;
  }) => {
    // Optimistically add the book to the list
    const newBook = {
      ...newBookData,
      id: -1, // Temporarily set an ID for optimistic UI
      author: { firstname: "", lastname: "" }, // Temporary placeholder for author
      authorName: newBookData.authorName, // Ensure `authorName` is added correctly
    };

    // Add the new book optimistically
    setBooks((prevBooks) => [...prevBooks, newBook]);

    try {
      // Send the new book data to the API
      const response = await fetch('http://localhost:3001/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBookData),
      });

      if (response.ok) {
        const createdBook = await response.json();
        // Replace the placeholder book with the actual data from the server
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book.id === -1 ? createdBook : book))
        );
      } else {
        console.error('Failed to create book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      // Optionally handle failure (e.g., remove the temporary book)
    }
  };

  // Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">Books Page</h1>
      
      {/* BookList component */}
      <BookList books={books} addBook={openModal} />

      {/* Modal for adding a new book */}
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <BookForm closeModal={closeModal} addBook={handleAddBook} />
        </Modal>
      )}
    </div>
  );
}
