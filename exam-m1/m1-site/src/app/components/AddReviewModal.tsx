// src/app/components/AddReviewModal.tsx
'use client';

import React, { useState } from 'react';
import { Slider, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface AddReviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number, reviewText: string) => void;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = useState<number>(3);
  const [reviewText, setReviewText] = useState<string>('');

  const handleAddReview = () => {
    onSubmit(rating, reviewText);
    setRating(3); // Reset rating to default
    setReviewText(''); // Clear review text
    onClose(); // Close the modal
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Review</DialogTitle>
      <DialogContent className="space-y-4">
        <div>
          <p>Select Rating:</p>
          <Slider
            value={rating}
            onChange={(e, value) => setRating(value as number)}
            min={1}
            max={5}
            step={1}
            marks
            valueLabelDisplay="auto"
            className="mt-2"
          />
        </div>
        <TextField
          label="Review (optional)"
          multiline
          rows={3}
          variant="outlined"
          fullWidth
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddReview} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReviewModal;
