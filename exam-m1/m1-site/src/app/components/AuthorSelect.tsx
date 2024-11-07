// components/AuthorSelect.tsx

'use client';

import React from 'react';
import { useAuthors } from '../providers/AuthorProvider';

interface AuthorSelectProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const AuthorSelect: React.FC<AuthorSelectProps> = ({ value, onChange, required }) => {
  const { authors } = useAuthors();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700" htmlFor="authorId">
        Author
      </label>
      <select
        id="authorId"
        name="authorId"
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        required={required}
      >
        <option value={0}>Select an Author</option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.firstname} {author.lastname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AuthorSelect;
