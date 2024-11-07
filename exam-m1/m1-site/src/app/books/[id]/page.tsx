'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useBooks } from '../../providers/BookProvider';
import { BookDetailModel } from '../../models/book';
import { Drawer, Button } from '@mui/material';
import Reviews from '../../components/Reviews';
import { ReviewProvider } from '../../providers/RatingProvider';
import Modal from '../../components/ConfirmDelete'; // Import your Modal component

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getBookById, deleteBook } = useBooks(); // Assuming deleteBook function is in the provider
  const [book, setBook] = useState<BookDetailModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false); // Track if modal is open
  const [deleteError, setDeleteError] = useState<string | null>(null); // To store delete errors

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        setLoading(true);
        setError(null);
        const fetchedBook = await getBookById(Number(id));
        if (fetchedBook) {
          setBook(fetchedBook);
        } else {
          setError('Error fetching book details');
        }
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, getBookById]);

  const handleToggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleDeleteBook = async () => {
    if (book?.id) {
      try {
        await deleteBook(book.id);
        
        console.log("book deleted");// Call the deleteBook function in your provider
        router.push('/');  // Redirect to the homepage or any other page after deletion
      } catch (error) {
        setDeleteError('Error deleting the book');
      }
    }
  };

  const handleModalConfirm = () => {
    setModalOpen(false);
    handleDeleteBook(); // Proceed with book deletion
  };

  const handleModalCancel = () => {
    setModalOpen(false); // Close modal without deleting
  };

  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-center space-x-6">
        <div className="flex flex-col md:w-2/3">
          <h1 className="text-3xl font-semibold text-gray-800">{book.title}</h1>
          <p className="mt-2 text-lg text-gray-600">
            by <a href={`/authors/${book.authorId}`} className="text-blue-500 hover:underline">{book.authorName}</a>
          </p>
          <p className="mt-4 text-lg"><span className="font-medium">Price:</span> ${book.price.toFixed(2)}</p>
          <p className="text-lg"><span className="font-medium">Published Year:</span> {book.publishYear}</p>
          <Button variant="outlined" color="primary" onClick={handleToggleDrawer(true)} className="mt-6">
            View Reviews
          </Button>
          {/* Add Delete Button */}
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => setModalOpen(true)} // Open confirmation modal
            className="mt-4"
          >
            Delete Book
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalOpen && (
        <Modal
          message="Are you sure you want to delete this book?"
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}

      <Drawer anchor="right" open={drawerOpen} onClose={handleToggleDrawer(false)}>
        <div className="w-80 p-4">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <ReviewProvider>
            {book.id && <Reviews bookId={book.id} authorId={book.authorId} />}
          </ReviewProvider>
        </div>
      </Drawer>
    </div>
  );
};

export default BookDetail;
