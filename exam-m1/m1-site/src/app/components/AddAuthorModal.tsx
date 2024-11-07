import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

interface AddAuthorModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const AddAuthorModal: React.FC<AddAuthorModalProps> = ({ closeModal, children }) => {
  return (
    <Dialog open onClose={closeModal}>
      <DialogTitle>Add New Author</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAuthorModal;
