'use client';

import React, { useState } from 'react';
import { AuthorProvider, useAuthors } from '../providers/AuthorProvider'; // Assuming you have an AuthorProvider
import AuthorList from './AuthorList';
import AddAuthorModal from '../components/AddAuthorModal';
import AuthorForm from '../components/AddAuthorForm';

export default function Authors() {
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle modal for adding a new author

  // Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <AuthorProvider>
      <AuthorsContent closeModal={closeModal} openModal={openModal} isModalOpen={isModalOpen} />
    </AuthorProvider>
  );
}

const AuthorsContent = ({ closeModal, openModal, isModalOpen }: any) => {
  const { authors, addAuthor } = useAuthors(); // Using the useAuthors hook

  // Handle adding a new author
  const handleAddAuthor = async (newAuthorData: any) => {
    await addAuthor(newAuthorData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">Authors Page</h1>
      
      {/* AuthorList component */}
      <AuthorList authors={authors} addAuthor={openModal} />

      {/* Modal for adding a new author */}
      {isModalOpen && (
        <AddAuthorModal closeModal={closeModal}>
          <AuthorForm closeModal={closeModal} addAuthor={handleAddAuthor} />
        </AddAuthorModal>
      )}
    </div>
  );
};
