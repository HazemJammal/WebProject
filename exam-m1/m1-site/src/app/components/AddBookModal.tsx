import React from 'react';

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-700 text-xl"
          onClick={closeModal} // Close the modal
        >
          &times; {/* X symbol */}
        </button>
        
        {/* Modal content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
