// components/ConfirmationModal.tsx

import React from 'react';

interface ConfirmationModalProps {
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, isOpen, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h3 className="text-lg font-semibold">Confirmation</h3>
        <p className="mt-2">{message}</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={onConfirm}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
