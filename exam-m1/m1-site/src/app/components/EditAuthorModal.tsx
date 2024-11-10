// components/EditAuthorModal.tsx

import React, { useState } from 'react';
import { Author } from '../models/author';
import { useAuthors } from '../providers/AuthorProvider';
import ConfirmationModal from './ConfirmationModal';

interface EditAuthorModalProps {
  author: Author;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const EditAuthorModal: React.FC<EditAuthorModalProps> = ({ author, isOpen, onClose, onConfirm }) => {
  const { updateAuthor } = useAuthors();
  const [firstname, setFirstname] = useState(author.firstname);
  const [lastname, setLastname] = useState(author.lastname);
  const [photo, setPhoto] = useState(author.photo);
  const [biography, setBiography] = useState(author.biography);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSaveChanges = async () => {
    try {
      await updateAuthor({
        ...author,
        firstname,
        lastname,
        photo,
        biography,
      });
      setShowConfirmation(false); // Close the confirmation modal
      onConfirm(); // Trigger onConfirm callback
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  const handleOpenConfirmation = () => setShowConfirmation(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Author</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="First Name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Last Name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="Photo URL"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            placeholder="Biography"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button className="px-4 py-2 bg-gray-200 rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleOpenConfirmation}>
            Save Changes
          </button>
        </div>

        {/* Confirmation Modal */}
        <ConfirmationModal
          message="Author Information has been updated"
          isOpen={showConfirmation}
          onConfirm={handleSaveChanges}
        />
      </div>
    </div>
  );
};

export default EditAuthorModal;
