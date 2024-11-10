import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { AddAuthor } from '../models/author';

interface AuthorFormProps {
  closeModal: () => void;
  addAuthor: (author: AddAuthor) => void;
}

const AuthorForm: React.FC<AuthorFormProps> = ({ closeModal, addAuthor }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [photo, setPhoto] = useState('');
  const [biography, setBiography] = useState('');

  // Handle photo file change

  // Handle form submit
  const handleSubmit = () => {
    if (photo && firstname && lastname && biography) {
      const newAuthor = {
        firstname,
        lastname,
        photo, // Temporary URL for preview
        biography,
      };
      addAuthor(newAuthor);
      closeModal();
    } else {
      alert('Please fill in all fields and upload a photo.');
    }
  };

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <TextField
        label="First Name"
        fullWidth
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <TextField
        label="Last Name"
        fullWidth
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <TextField
        label="Photo url"
        fullWidth
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />
      <TextField
        label="Biography"
        fullWidth
        multiline
        rows={4}
        value={biography}
        onChange={(e) => setBiography(e.target.value)}
      />
      <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
        Add Author
      </Button>
    </form>
  );
};

export default AuthorForm;
