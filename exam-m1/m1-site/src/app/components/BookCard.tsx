import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Book } from '../models/book';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/reviews/book/${book.id}/average-rating`);
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchAverageRating();
  }, [book.id]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p className="text-gray-600">Author: {book.authorName}</p>
      <p className="text-gray-600">Price: ${book.price}</p>
      <p className="text-gray-600">Publish Year: {book.publishYear}</p>

      {averageRating !== null ? (
        <div className="flex items-center">
          <p className="text-gray-600 mr-2">Average Rating:</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.round(averageRating) ? (
                  <StarIcon color="primary" />
                ) : (
                  <StarBorderIcon color="disabled" />
                )}
              </span>
            ))}
          </div>
          <p className="text-gray-600 ml-2">({averageRating.toFixed(1)})</p>
        </div>
      ) : (
        <div className="flex items-center">
          <p className="text-gray-600 mr-2">No ratings yet</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                <StarBorderIcon color="disabled" />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;
