// src/app/components/AuthorCard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star as StarIcon, StarBorder as StarBorderIcon } from '@mui/icons-material';
import { Author } from '../models/author';

interface AuthorCardProps {
  author: Author;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/reviews/author/${author.id}/average-rating`);
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchAverageRating();
  }, [author.id]);

  const roundedRating = averageRating ? Math.round(averageRating) : 0;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <img
        src={author.photo}
        alt={`${author.firstname} ${author.lastname}`}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold">{author.firstname} {author.lastname}</h2>
      <p className="text-gray-600">Books Written: {author.bookCount}</p>
      <div className="flex items-center mt-2">
        <p className="text-gray-600 mr-2">Average Rating:</p>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <span key={i}>
              {i < roundedRating ? (
                <StarIcon color="primary" />
              ) : (
                <StarBorderIcon color="disabled" />
              )}
            </span>
          ))}
        </div>
        <p className="text-gray-600 ml-2">({averageRating !== null ? averageRating.toFixed(1) : '0.0'})</p>
      </div>
    </div>
  );
};

export default AuthorCard;
