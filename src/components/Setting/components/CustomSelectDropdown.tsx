import React from "react";
import styles from "../styles/CustomSelectDropdown.module.css";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectDropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

const CustomSelectDropdown = ({
  options,
  ...props
}: CustomSelectDropdownProps) => {
  return (
    <div className={styles.selectContainer}>
      <label className={styles.select} htmlFor={props.id || "slct"}>
        <select {...props}>
          <option value="" disabled>
            Select option
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg>
          <use xlinkHref="#select-arrow-down" />
        </svg>
      </label>
      <svg className={styles.sprites}>
        <symbol id="select-arrow-down" viewBox="0 0 10 6">
          <polyline points="1 1 5 5 9 1" />
        </symbol>
      </svg>
    </div>
  );
};

export default React.memo(CustomSelectDropdown);
