'use client';

import React, { useState } from 'react';

interface BookFormProps {
  closeModal: () => void;
  addBook: (newBookData: { title: string; price: number; publishYear: number; authorName: string }) => void;
}

const BookForm: React.FC<BookFormProps> = ({ closeModal, addBook }) => {
  const [newBook, setNewBook] = useState<{
    title: string;
    price: number;
    publishYear: number;
    authorName: string;
  }>({
    title: '',
    price: 0,
    publishYear: 0,
    authorName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBook(newBook); // Add the new book
    closeModal(); // Close the modal after form submission
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="price">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={newBook.price}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="publishYear">
          Publish Year
        </label>
        <input
          type="number"
          id="publishYear"
          name="publishYear"
          value={newBook.publishYear}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="authorName">
          Author Name
        </label>
        <input
          type="text"
          id="authorName"
          name="authorName"
          value={newBook.authorName}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Add Book
        </button>
      </div>
    </form>
  );
};

export default BookForm;
