import styles from "../styles/DueDatePicker.module.css";

interface DueDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

const DueDatePicker = ({ value, onChange, onClear }: DueDatePickerProps) => {
  return (
    <div className={styles.pickerRow}>
      <input
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.dateInput}
        aria-label="Due date"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className={styles.clearButton}
          aria-label="Clear due date"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default DueDatePicker;
