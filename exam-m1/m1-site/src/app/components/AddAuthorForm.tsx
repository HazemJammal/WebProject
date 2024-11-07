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
  const [photo, setPhoto] = useState<File | null>(null);
  const [biography, setBiography] = useState('');

  // Handle photo file change
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setPhoto(file);
      } else {
        alert('Please upload a .jpg or .png image');
      }
    }
  };

  // Handle form submit
  const handleSubmit = () => {
    if (photo && firstname && lastname && biography) {
      const newAuthor = {
        firstname,
        lastname,
        photo: URL.createObjectURL(photo), // Temporary URL for preview
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
      <div>
        <input
          type="file"
          accept=".jpg,.png"
          onChange={handlePhotoChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        {photo && <p className="text-sm text-gray-500">Selected photo: {photo.name}</p>}
      </div>
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
