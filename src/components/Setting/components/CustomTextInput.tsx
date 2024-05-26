import React from "react";
import styles from "../styles/CustomSelectDropdown.module.css";

interface CustomTextInputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CustomTextInput = ({
  type,
  name,
  value,
  onChange,
  className,
  placeholder,
  disabled,
}: CustomTextInputProps) => {
  return (
    <div className={styles.selectContainer}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`${styles.settingInput} ${className}`}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default React.memo(CustomTextInput);
