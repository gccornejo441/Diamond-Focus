import React, { useEffect, useRef, useState } from "react";
import ListMenuButton from "@assets/listMenuIcon.svg?react";
import { TaskListTitleProps } from "../../types/SidebarTypes";
import styles from "./SidebarList.module.css";
import Dropdown from "../../../Dropdown/Dropdown";

interface SidebarTaskListProps extends TaskListTitleProps {
  onDelete: (id: number) => void;
}

const SidebarTaskList = ({
  id,
  value,
  onTitleChange,
  onDelete,
}: SidebarTaskListProps) => {
  const [isEditing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTextClick = () => {
    setEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = () => {
    onTitleChange(id, inputValue);
    setEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <div className={styles.taskList}>
      <div className={styles.editableText}>
        {isEditing ? (
          <input
            ref={inputRef}
            className={styles.input}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        ) : (
          <div onDoubleClick={handleTextClick} className={styles.taskListTitle}>
            {value}
          </div>
        )}
      </div>
      <Dropdown
        stateHandlers={{
          "Rename list": () => setEditing(true),
          "Delete list": handleDeleteClick,
        }}
      >
        <ListMenuButton className={styles.svgStyle} />
      </Dropdown>
    </div>
  );
};

export default SidebarTaskList;
