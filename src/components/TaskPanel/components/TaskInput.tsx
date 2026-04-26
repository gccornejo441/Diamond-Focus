import { Task } from "@components/Sidebar";
import styles from "../styles/TaskInput.module.css";
import TaskButton from "@assets/taskIcon.svg?react";
import { useState } from "react";
import DueDatePicker from "./DueDatePicker";

interface TaskInputProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  isNewTaskOnTop: boolean;
}

const TaskInput = ({ tasks, setTasks, isNewTaskOnTop }: TaskInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<string>("");

  const addTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        favorite: false,
        createdAt: new Date(),
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      } as Task;
      setTasks(isNewTaskOnTop ? [newTask, ...tasks] : [...tasks, newTask]);
      setInputValue("");
      setDueDate("");
      setShowDatePicker(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      addTask();
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="What's your next task?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.input}
        />
        <button
          type="button"
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="controlButton"
          aria-label="Toggle due date picker"
        >
          📅
        </button>
        <button
          onClick={addTask}
          className="controlButton"
          disabled={inputValue.trim() === ""}
        >
          <TaskButton
            className={styles.svgStyle}
            style={{
              cursor: inputValue.trim() === "" ? "not-allowed" : "inherit",
            }}
          />
        </button>
      </div>
      {showDatePicker && (
        <div className={styles.datePickerArea}>
          <DueDatePicker
            value={dueDate}
            onChange={setDueDate}
            onClear={() => setDueDate("")}
          />
        </div>
      )}
    </div>
  );
};

export default TaskInput;
