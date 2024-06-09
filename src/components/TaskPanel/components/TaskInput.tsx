import { Task } from "@components/Sidebar";
import styles from "../styles/TaskInput.module.css";
import TaskButton from "@assets/taskIcon.svg?react";
import { useState } from "react";

interface TaskInputProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  isNewTaskOnTop: boolean;
}

const TaskInput = ({ tasks, setTasks, isNewTaskOnTop }: TaskInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const addTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        favorite: false,
        createdAt: new Date(),
      } as Task;
      setTasks(isNewTaskOnTop ? [newTask, ...tasks] : [...tasks, newTask]);
      setInputValue("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      addTask();
    }
  };

  return (
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
  );
};

export default TaskInput;
