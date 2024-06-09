import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "../styles/TaskItem.module.css";
import { formatDistanceToNowStrict } from "date-fns";
import type { FormatDistanceToNowOptions } from "date-fns";
import { TaskComponentProps } from "../types/TaskTypes";
import DragHandle from "@assets/dragHandleIcon.svg?react";

const TaskItem = ({
  task,
  toggleTaskCompletion,
  handleDoubleClick: parentHandleDoubleClick,
  saveEdit,
}: TaskComponentProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });
  const relativeTime = formatDistanceToNowStrict(task.createdAt || new Date(), {
    addSuffix: true,
    includeSeconds: true,
  } as FormatDistanceToNowOptions);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
  };

  const handleDoubleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleSaveEdit = () => {
    if (editText.trim() !== "") {
      saveEdit(task.id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSaveEdit();
    }
  };

  return (
    <li
      key={task.id}
      style={style}
      ref={setNodeRef}
      {...attributes}
      id={`task-${task.id}`}
      className={`${styles.taskItem} ${task.favorite ? styles.favoriteTask : ""}`}
      onContextMenu={(e) => parentHandleDoubleClick(e, task)}
      onDoubleClick={handleDoubleClick}
    >
      <div className={styles.checkboxwrapper15}>
        <input
          className={styles.inpCbx}
          id={`cbx-${task.id}`}
          type="checkbox"
          checked={task.completed}
          style={{ display: "none" }}
          onChange={() => toggleTaskCompletion(task.id)}
        />
        <label className={styles.cbx} htmlFor={`cbx-${task.id}`}>
          <span>
            <svg width="12px" height="9px" viewBox="0 0 12 9">
              <polyline points="1 5 4 8 11 1"></polyline>
            </svg>
          </span>
        </label>
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={handleEditChange}
            onKeyDown={handleKeyDown}
            onBlur={handleSaveEdit}
            className={styles.input}
            autoFocus
          />
        ) : (
          <p
            id={`text-${task.id}`}
            className={`${styles.taskText} ${task.completed ? styles.strikethrough : ""}`}
          >
            {task.text}
            <span className={styles.timeStamp}>{relativeTime}</span>
          </p>
        )}
      </div>
      <div
        style={{ touchAction: "none" }}
        className={styles.handle}
        {...listeners}
      >
        <DragHandle className={styles.dragHandle} aria-label="Drag" />
      </div>
    </li>
  );
};

export default TaskItem;
