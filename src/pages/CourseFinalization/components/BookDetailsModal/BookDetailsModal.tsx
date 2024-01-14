import React from 'react';
import './BookCardModal.css'; // Adjust the path as needed
import Button from '../../../../components/Button/Button'; // Adjust the path as needed

interface Book {
  title: string;
  description: string;
  tableOfContents?: { chapter_number: string; chapter_name: string }[];
}

interface MergedModalProps {
  selectedBook: Book | null;
  onClose: () => void;
  onReadNowClick: () => void;
  isLoading: boolean;
}

const MergedModal: React.FC<MergedModalProps> = ({ selectedBook, onClose, onReadNowClick, isLoading }) => {
  if (!selectedBook) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{selectedBook.title}</h2>
        <p>{selectedBook.description}</p>

        {isLoading ? (
          <p>Loading the Book...</p>
        ) : (
          <Button text="Read Now" onClick={onReadNowClick} />
        )}
      </div>
    </div>
  );
};

export default MergedModal;
