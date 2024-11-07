import React from 'react';

interface BookInputFieldProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const BookInputField: React.FC<BookInputFieldProps> = ({
  id,
  label,
  name,
  type = 'text',
  value,
  onChange,
  required,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        required={required}
      />
    </div>
  );
};

export default BookInputField;
