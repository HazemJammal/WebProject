// BookForm.tsx
import React, { useState } from 'react';
import AuthorSelect from './AuthorSelect';
import { AuthorProvider } from '../providers/AuthorProvider';

interface BookFormProps {
  closeModal: () => void;
  addBook: (newBookData: { title: string; price: number; publishYear: number; authorId: number }) => void;
}

const BookForm: React.FC<BookFormProps> = ({ closeModal, addBook }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [publishYear, setPublishYear] = useState(0);
  const [authorId, setAuthorId] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBook({ title, price, publishYear, authorId });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields for title, price, publish year, and author selection */}
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
          type="text"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
          required
          pattern="\d*" // only allows digits
          inputMode="numeric" // ensures numeric keyboard for mobile
          min="1"
          className="w- full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="publishYear" className="block text-sm font-medium text-gray-700">Publish Year</label>
        <input
          type="text"
          value={publishYear}
          onChange={(e) => setPublishYear(Number(e.target.value))}
          placeholder="Publish Year"
          required
          pattern="\d*" // only allows digits
          inputMode="numeric" // ensures numeric keyboard for mobile
          min={1}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <AuthorProvider>
        <AuthorSelect value={authorId} onChange={(e) => setAuthorId(Number(e.target.value))} required />
      </AuthorProvider>
      <button type="submit" className="bg-green-600 text-white p-2 rounded">Add Book</button>
    </form>
  );
};

export default BookForm;
