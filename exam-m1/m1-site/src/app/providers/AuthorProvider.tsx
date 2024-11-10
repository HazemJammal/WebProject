// providers/AuthorProvider.tsx

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Author, AuthorStats } from '../models/author';
import { Book } from '../models/book';

interface AuthorContextType {
  authors: Author[];
  addAuthor: (authorData: Omit<Author, 'id'>) => Promise<void>;
  refreshAuthors: () => void;
  getAuthorById: (id: number) => Promise<Author | null>;  // New method to get a single author
  getBooksByAuthorId: (authorId: number) => Promise<Book[]>;  // New method to get books by author
  updateAuthor: (authorData: Author) => Promise<void>;
  getAuthorsStats: () => Promise<AuthorStats[]>;
  deleteAuthor: (id: number) => Promise<void>;
}

const AuthorContext = createContext<AuthorContextType | undefined>(undefined);

export const AuthorProvider = ({ children }: { children: ReactNode }) => {
  const [authors, setAuthors] = useState<Author[]>([]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get<Author[]>('http://localhost:3001/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const addAuthor = async (authorData: Omit<Author, 'id'>) => {
    try {
      const response = await axios.post('http://localhost:3001/authors', authorData);
      setAuthors((prevAuthors) => [...prevAuthors, response.data]);
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  const deleteAuthor = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/authors/${id}`);
      setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== id));
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  }

  const getAuthorsStats = async (): Promise<AuthorStats[]> => {
    try {
      const response = await axios.get('http://localhost:3001/authors/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching authors stats:', error);
      return [];
    }
  }
  const getAuthorById = async (id: number): Promise<Author | null> => {
    try {
      const response = await axios.get(`http://localhost:3001/authors/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching author by ID:', error);
      return null;
    }
  };

  const getBooksByAuthorId = async (authorId: number): Promise<Book[]> => {
    try {
      const response = await axios.get(`http://localhost:3001/books/author/${authorId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching books by author ID:', error);
      return [];
    }
  };

  const updateAuthor = async (authorData: Author) => {
    try {
      const response = await axios.put(`http://localhost:3001/authors/${authorData.id}`, authorData);
      setAuthors((prevAuthors) =>
        prevAuthors.map((author) => (author.id === authorData.id ? response.data : author))
      );
    } catch (error) {
      console.error('Error updating author:', error);
    }
  }

  const refreshAuthors = () => {
    fetchAuthors();
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <AuthorContext.Provider value={{ authors, deleteAuthor,getAuthorsStats,addAuthor, refreshAuthors, getAuthorById, getBooksByAuthorId,updateAuthor }}>
      {children}
    </AuthorContext.Provider>
  );
};

export const useAuthors = () => {
  const context = useContext(AuthorContext);
  if (!context) {
    throw new Error('useAuthors must be used within an AuthorProvider');
  }
  return context;
};
