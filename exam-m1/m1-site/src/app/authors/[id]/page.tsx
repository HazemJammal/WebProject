// app/authors/[id]/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuthors } from '../../providers/AuthorProvider';
import { Author} from '../../models/author';
import { Book } from '../../models/book';
import EditAuthorModal from '../../components/EditAuthorModal';

const AuthorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getAuthorById, getBooksByAuthorId } = useAuthors();
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      if (id) {
        setLoading(true);
        try {
          // Fetch author details
          const fetchedAuthor = await getAuthorById(Number(id));
          if (fetchedAuthor) {
            setAuthor(fetchedAuthor);
            // Fetch books by this author
            const fetchedBooks = await getBooksByAuthorId(Number(id));
            setBooks(fetchedBooks);
          } else {
            setError('Author not found');
          }
        } catch (err) {
          setError('Error fetching author details');
        }
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [id, getAuthorById, getBooksByAuthorId]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!author) return <div>Author not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={author.photo}
          alt={`${author.firstname} ${author.lastname}`}
          className="w-32 h-32 rounded-full object-cover"
        />
        <h1 className="text-3xl font-semibold text-gray-800">{author.firstname} {author.lastname}</h1>
        <p className="text-lg text-gray-600 text-center">{author.biography}</p>
      </div>
      <div>
      {/* Existing author detail display code */}
      <button onClick={() => setEditModalOpen(true)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        Edit Author
      </button>

      {/* Edit Author Modal */}
      <EditAuthorModal
        author={author}
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onConfirm={() => {
          setEditModalOpen(false);
          // Refresh author details here if needed
        }}
      />
    </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Books by {author.firstname} {author.lastname}</h2>
        {books.length > 0 ? (
          <ul className="space-y-4 mt-4">
            {books.map((book) => (
              <li key={book.id} className="p-4 border rounded-lg">
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="text-gray-600">Published: {book.publishYear}</p>
                <p className="text-gray-600">Price: ${book.price.toFixed(2)}</p>
                <a href={`/books/${book.id}`} className="text-blue-500 hover:underline">View Book</a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-600">No books found for this author.</p>
        )}
      </div>
    </div>
  );
};

export default AuthorDetail;
