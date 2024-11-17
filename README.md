# Web App: React + Next.js Frontend and NestJS Backend

## Overview

This project is a full-stack web application built with a **React frontend** using **Next.js** and a **NestJS backend**. It demonstrates modern web development practices, leveraging TypeScript, reusable components, and clean architecture.

## Features

- **Frontend (React + Next.js)**:
  - Server-side rendering (SSR) for better SEO and performance.
  - Client-side routing for a seamless user experience.
  - Reusable and responsive components.
  
- **Backend (NestJS)**:
  - Modular architecture for scalability.
  - RESTful APIs with validation and error handling.
  - TypeScript-first development with strict type checking.

- **Database**:
  - Supports SQL/NoSQL databases (e.g., PostgreSQL, MongoDB). *(Customize as per your setup)*.

- **Deployment**:
  - Easily deployable to platforms like Vercel (for frontend) and Railway/Render (for backend).

## Tech Stack

### Frontend
- **Framework**: Next.js
- **Language**: TypeScript
- **UI Library**: React
- **Styling**: CSS/SCSS/Styled-Components (adjust as applicable)
- **State Management**: Context API/Redux (if used)

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL/MongoDB/SQLite (depending on your setup)
- **ORM**: TypeORM/Prisma/Sequelize (depending on your setup)
- **Authentication**: JWT/Session-based (if implemented)

---


# Book Management Application

This project is a book management application featuring a NestJS backend and a React frontend styled with Tailwind CSS. The backend provides RESTful APIs for creating, reading, updating, and deleting books and authors, with data persistence managed by SQLite. The frontend offers an interactive user interface that is responsive and visually cohesive.

## Features

### Books Page
![Books Page](https://github.com/user-attachments/assets/35aa9948-1929-4858-8529-212fe8f04467)

- Displays a list of all books.
- Users can create new books.
- Users can see reviews of the books, rated from 0-5 stars.

### Book Page
![Book Page](https://github.com/user-attachments/assets/62627755-51cb-4b81-9268-aff879910c12)

- Allows users to view detailed information about a specific book.
- Users can submit reviews for the book.

### Authors Page
![Authors Page](https://github.com/user-attachments/assets/02639718-4c15-4e18-88c6-45ec963ffc5e)

- Displays a list of all authors.
- Shows reviews of the authors based on the books they have published.

### Author Page
![Author Page](https://github.com/user-attachments/assets/bbaf4555-5c20-4e6b-8d30-ebeb8d74d739)

- Allows authors to add new books to their profile.

## Installation

```bash
$ npm install
## Installation and Setup

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v16 or later)
- **npm** or **yarn**
- **Database**: PostgreSQL/MongoDB/SQLite (set up your database of choice)

### For m1-api
```bash
$ cd exam-m1/m1-api
$ npm install
$ nest start

### For m1-site
$ cd exam-m1/m1-site
$ npm install
$ npm run dev
