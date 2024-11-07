// src/app/providers/ReviewProvider.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { Review, AddReview } from '../models/review';

interface ReviewContextType {
  getReviewsByBookId: (bookId: number) => Review[] | null;
  fetchReviews: (bookId: number) => void;
  addReview: (review: AddReview) => Promise<void>;  // Add the addReview method
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Fetch reviews for a book
  const fetchReviews = async (bookId: number) => {
    try {
      const response = await axios.get(`http://localhost:3001/reviews?bookId=${bookId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  // Get reviews by bookId
  const getReviewsByBookId = (bookId: number): Review[] | null => {
    return reviews.filter((review) => review.bookId === bookId) || null;
  };

  // Add a review
  const addReview = async (review: AddReview) => {
    try {
      const response = await axios.post('http://localhost:3001/reviews', review);
      // Optionally, update the reviews state by adding the new review to the list
      setReviews((prevReviews) => [...prevReviews, response.data]);
      console.log("adding review ???")
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <ReviewContext.Provider value={{ getReviewsByBookId, fetchReviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};
