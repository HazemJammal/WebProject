// BookProvider.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { AddBook, Book, BookDetailModel } from '../models/book';

interface BookProviderProps {
  children: ReactNode;
}

interface BookContextType {
  books: Book[];
  addBook: (book: AddBook) => Promise<void>;
  updateBook: (id: number, updatedBookData: Partial<Book>) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  fetchBooks: () => Promise<void>;
  getBookById: (id: number) => Promise<BookDetailModel | null>;  // New method to get a single book

}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);

  // Fetch books from the backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  

  // Add a new book
  const addBook = async (newBookData: AddBook) => {
    try {
      const response = await axios.post('http://localhost:3001/books', newBookData);
      setBooks((prevBooks) => [...prevBooks, response.data]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Update an existing book
  const updateBook = async (id: number, updatedBookData: Partial<Book>) => {
    try {
      const response = await axios.put(`http://localhost:3001/books/${id}`, updatedBookData);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === id ? response.data : book))
      );
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // Delete a book by ID
  const deleteBook = async (id: number) => {
    try {
      // First, delete the reviews associated with the book
      await axios.delete(`http://localhost:3001/reviews/${id}`);
      
      // Then, delete the book itself
      await axios.delete(`http://localhost:3001/books/${id}`);
      
      // Update the state to remove the book from the list
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book and its reviews:', error);
    }
  };

  const getBookById = async (id: number): Promise<BookDetailModel | null> => {
    try {
      const response = await axios.get(`http://localhost:3001/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book by ID:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook, fetchBooks,getBookById }}>
      {children}
    </BookContext.Provider>
  );
};

// Hook to use book context
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
