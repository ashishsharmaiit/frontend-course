// src/components/BookCardList.tsx
import React from 'react';
import BookCard from './BookCard/BookCard';

interface Book {
  title: string;
  description: string;
  tableOfContents?: { chapter_number: string; chapter_name: string }[];
}

interface BookCardListProps {
  books: Book[];
  onBookClick: (book: Book) => void;
}

const BookCardList: React.FC<BookCardListProps> = ({ books, onBookClick }) => {
  return (
    <>
      {books.map((book, index) => (
        <BookCard
          key={index}
          upperText={book.title}
          lowerText={book.description}
          onClick={() => onBookClick(book)}
        />
      ))}
    </>
  );
};

export default BookCardList;
