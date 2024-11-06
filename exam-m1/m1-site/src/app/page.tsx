// app/page.tsx
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-blue-600">Home Page</h1>
      <p className="mt-4 text-lg text-gray-700">Welcome to the Home page! You can navigate to other pages using the links above.</p>
    </div>
  );
}
