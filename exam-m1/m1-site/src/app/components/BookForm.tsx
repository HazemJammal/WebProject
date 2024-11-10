import React, { useState, useEffect } from 'react';
import AuthorSelect from './AuthorSelect';
import { AuthorProvider } from '../providers/AuthorProvider';

interface BookFormProps {
  closeModal: () => void;
  addBook: (newBookData: { title: string; price: number; publishYear: number; authorId: number }) => void;
  authorId?: number; // authorId is optional, for the case when accessing from the author's page
}

const BookForm: React.FC<BookFormProps> = ({ closeModal, addBook, authorId }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [publishYear, setPublishYear] = useState(0);
  const [selectedAuthorId, setSelectedAuthorId] = useState<number | null>(authorId || null); // Default to passed authorId

  useEffect(() => {
    if (authorId) {
      setSelectedAuthorId(authorId); // Automatically set the authorId if passed as a prop
    }
  }, [authorId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAuthorId !== null) {
      addBook({ title, price, publishYear, authorId: selectedAuthorId });
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Book Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book Title"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
          required
          min="1"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="publishYear" className="block text-sm font-medium text-gray-700">Publish Year</label>
        <input
          type="number"
          value={publishYear}
          onChange={(e) => setPublishYear(Number(e.target.value))}
          placeholder="Publish Year"
          required
          min="1"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Conditionally render AuthorSelect if authorId is not passed */}
      {!authorId && (
        <AuthorProvider>
          <AuthorSelect value={selectedAuthorId || 0} onChange={(e) => setSelectedAuthorId(Number(e.target.value))} required />
        </AuthorProvider>
      )}

      <button type="submit" className="bg-green-600 text-white p-2 rounded">Add Book</button>
    </form>
  );
};

export default BookForm;
