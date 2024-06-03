import React from "react";
import styles from "../styles/CustomTextInput.module.css";
import CloseButton from "@assets/closeIcon.svg?react";

interface CustomTextInputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onClear: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomTextInput = ({
  type,
  name,
  value,
  onChange,
  className,
  placeholder,
  disabled,
  onClear,
}: CustomTextInputProps) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`${styles.settingInput} ${className || ""}`}
        placeholder={placeholder}
        disabled={disabled}
      />
      {value && (
        <button type="button" className={styles.clearButton} onClick={onClear}>
          <CloseButton />
        </button>
      )}
    </div>
  );
};

export default React.memo(CustomTextInput);
