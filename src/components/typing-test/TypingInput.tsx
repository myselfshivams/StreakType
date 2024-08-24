import React from 'react';
import styles from '../../styles/Typingtest.module.css';

interface TypingInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TypingInput: React.FC<TypingInputProps> = ({ inputRef, value, onChange }) => {
  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={onChange}
      autoFocus
      className={styles.inputField}
    />
  );
};

export default TypingInput;
