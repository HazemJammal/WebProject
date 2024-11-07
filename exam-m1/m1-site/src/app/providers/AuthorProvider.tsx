// providers/AuthorProvider.tsx

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Author } from '../models/author';

interface AuthorContextType {
  authors: Author[];
  addAuthor: (authorData: Omit<Author, 'id'>) => Promise<void>;
  refreshAuthors: () => void;
}

const AuthorContext = createContext<AuthorContextType | undefined>(undefined);

export const AuthorProvider = ({ children }: { children: ReactNode }) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const fetchAuthors = async () => {
    try {
      const response = await axios.get<Author[]>('http://localhost:3001/authors');
      console.log("Fetched authors:", response.data); // Log the response
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

  const refreshAuthors = () => {
    fetchAuthors();
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <AuthorContext.Provider value={{ authors, addAuthor, refreshAuthors }}>
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
