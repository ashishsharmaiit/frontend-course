import React from 'react';
import './BookCard.css'; 

interface TextComponentProps {
  upperText: string;
  lowerText: string;
  onClick: () => void; // Add onClick as a prop
}

const TextComponent: React.FC<TextComponentProps> = ({
  upperText,
  lowerText,
  onClick // Receive the onClick function
}) => {
  return (
    <div className="text-boxes">
      <div className="clickable-area" onClick={onClick}> 
        <div className="text-box upper-text">{upperText}</div>
        <div className="text-box lower-text">{lowerText}</div>
      </div>
    </div>
  );
};

export default TextComponent;
