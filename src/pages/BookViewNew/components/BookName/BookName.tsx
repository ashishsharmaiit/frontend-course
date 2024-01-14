import React from 'react';
import Text from '../../../../components/Text/Text'; // Adjust the path as needed
import './BookName.css'

interface BookDetailsProps {
  title: string;
}

const BookName: React.FC<BookDetailsProps> = ({ title }) => {
  return (
    <div className="book-name">
      <Text tag="h1" text={title} textAlign="center" />
    </div>
  );
};

export default BookName;
