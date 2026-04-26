import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "../styles/TaskItem.module.css";
import { formatDistanceToNowStrict, isPast, differenceInMinutes, parseISO } from "date-fns";
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

  const getDueDateInfo = () => {
    if (!task.dueDate) return null;
    const due = parseISO(task.dueDate);
    const overdue = isPast(due);
    const minutesUntil = differenceInMinutes(due, new Date());
    const label = overdue
      ? `overdue ${formatDistanceToNowStrict(due)} ago`
      : `due ${formatDistanceToNowStrict(due, { addSuffix: true })}`;
    const status: "overdue" | "soon" | "normal" =
      overdue ? "overdue" : minutesUntil <= 60 ? "soon" : "normal";
    return { label, status };
  };

  const dueDateInfo = getDueDateInfo();

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
      onDoubleClick={(e) => parentHandleDoubleClick(e, task)}
    >
      <div className={styles.checkboxwrapper15}>
        <div className={styles.checkboxwrapper}>
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
              id={`text-${task.id}`}
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
              onDoubleClick={handleDoubleClick}
              className={`${styles.taskText} ${task.completed ? styles.strikethrough : ""}`}
            >
              {task.text}
              <span className={styles.timeStamp}>{relativeTime}</span>
              {dueDateInfo && (
                <span
                  className={`${styles.dueDate} ${styles[dueDateInfo.status]}`}
                  data-testid="due-date-indicator"
                >
                  {dueDateInfo.label}
                </span>
              )}
            </p>
          )}
        </div>
        <div
          tabIndex={0}
          style={{ touchAction: "none" }}
          className={styles.handle}
          {...listeners}
        >
          <DragHandle className={styles.dragHandle} aria-label="Drag" />
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
