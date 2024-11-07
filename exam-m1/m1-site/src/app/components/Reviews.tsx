// src/app/components/Reviews.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Star, StarBorder } from "@mui/icons-material";
import AddReviewModal from './AddReviewModal';
import { Review } from '../models/review';
import { useReviews } from '../providers/RatingProvider';

interface ReviewsProps {
  bookId: number;
    authorId: number;
}

const Reviews: React.FC<ReviewsProps> = ({ bookId, authorId }) => {
  const { getReviewsByBookId, fetchReviews, addReview } = useReviews();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [modalOpen, setModalOpen] = useState(false);
  const reviews = getReviewsByBookId(bookId) || [];

  useEffect(() => {
    fetchReviews(bookId);
  }, [bookId, fetchReviews]);

  const sortedReviews = [...reviews].sort((a, b) => {
    return sortOrder === 'asc'
      ? new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime()
      : new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime();
  });

  const handleAddReview = (rating: number, reviewText: string) => {
    addReview({ bookId, rating, reviewText,authorId });
    setModalOpen(false);
  };

  return (
    <div className="relative mt-4 space-y-4">
      <button onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))} className="text-blue-500">
        Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
      </button>

      {sortedReviews.length === 0 ? (
        <p className="text-gray-500 mt-4">No reviews yet.</p>
      ) : (
        sortedReviews.map((review, index) => (
          <div key={index} className="p-3 border-b border-gray-200">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < review.rating ? <Star color="primary" /> : <StarBorder color="disabled" />}
                </span>
              ))}
            </div>
            {review.reviewText && <p className="mt-1 text-gray-600">{review.reviewText}</p>}
            <p className="text-sm text-gray-400 mt-1">{new Date(review.reviewDate).toDateString()}</p>
          </div>
        ))
      )}

      {/* Add Review Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        Add Review
      </button>

      {/* Add Review Modal */}
      <AddReviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddReview}
      />
    </div>
  );
};

export default Reviews;
