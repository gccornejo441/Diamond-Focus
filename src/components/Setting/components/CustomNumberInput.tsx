import React from "react";
import styles from "../styles/CustomNumberInput.module.css";
import MinusButton from "@assets/minusIcon.svg?react";
import PlusButton from "@assets/plusIcon.svg?react";

interface CustomNumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  id?: string;
  name?: string;
  className?: string;
}

const CustomNumberInput = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  placeholder,
  id,
  name,
  className,
  ...rest
}: CustomNumberInputProps) => {
  const handleIncrement = () => {
    if (max === undefined || value < max) {
      onChange(Math.min(value + step, max ?? value + step));
    }
  };

  const handleDecrement = () => {
    if (min === undefined || value > min) {
      onChange(Math.max(value - step, min ?? value - step));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      onChange(Number(newValue));
    }
  };

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      <button
        type="button"
        aria-label="Decrement"
        disabled={min !== undefined && value <= min}
        className={styles.decrementButton}
        onClick={handleDecrement}
      >
        <MinusButton />
      </button>
      <label className={styles.inputLabel} htmlFor={id}>
        <input
          type="number"
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          required
          pattern="\d*"
          {...rest}
        />
      </label>
      <button
        type="button"
        aria-label="Increment"
        disabled={max !== undefined && value >= max}
        className={styles.incrementButton}
        onClick={handleIncrement}
      >
        <PlusButton />
      </button>
    </div>
  );
};

export default React.memo(CustomNumberInput);
