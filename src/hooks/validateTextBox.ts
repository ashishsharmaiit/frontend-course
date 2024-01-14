// src/hooks/useTextBox.ts
import { useState } from 'react';

const validateTextBox = () => {
  const [textBoxValue, setTextBoxValue] = useState('');
  const [showError, setShowError] = useState(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextBoxValue(event.target.value);
  };

  const validateTextBox = () => {
    if (!textBoxValue.trim()) {
      setShowError(true);
      return false;
    } else {
      setShowError(false);
      return true;
    }
  };

  return { textBoxValue, showError, handleTextChange, validateTextBox };
};

export default validateTextBox;
