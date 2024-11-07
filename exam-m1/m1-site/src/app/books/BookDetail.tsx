import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooks } from '../providers/BookProvider'; // Importing the hook to access book context
import { Book } from '../models/book';
import Modal from '../components/ConfirmDelete'; // Modal component for confirmation

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Get the book ID from the URL params
  const navigate = useNavigate();
  const { books, deleteBook } = useBooks();  // Accessing books and deleteBook function from context
  const [book, setBook] = useState<Book | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch the book details based on the ID
  useEffect(() => {
    const bookFound = books.find((book) => book.id === parseInt(id!));
    if (bookFound) {
      setBook(bookFound);
    } else {
      console.error('Book not found');
    }
  }, [id, books]);

  // Handle delete action
  const handleDelete = async () => {
    await deleteBook(parseInt(id!)); // Delete the book by ID from context
    navigate('/'); // Redirect to the book list page after deletion
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p className="text-lg mb-2">Price: ${book.price}</p>
      <p className="text-lg mb-2">Published: {book.publishYear}</p>
      <p className="text-lg mb-4">
        Author: <a href={`/authors/${book.authorId}`} className="text-blue-600">{book.authorName}</a>
      </p>

      <button
        className="bg-red-600 text-white p-2 rounded"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        Delete Book
      </button>

      {/* Confirmation Modal */}
      {isDeleteModalOpen && (
        <Modal
          message="Are you sure you want to delete this book?"
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BookDetail;