import React, { useEffect, useRef, useState } from "react";
import ListMenuButton from "@assets/listMenuIcon.svg?react";
import { TaskListTitleProps } from "../../types/SidebarTypes";
import styles from "./SidebarList.module.css";
import Dropdown from "@components/Dropdown/Dropdown";

interface SidebarTaskListProps extends TaskListTitleProps {
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
}

const SidebarTaskList = ({
  id,
  value,
  onTitleChange,
  onDelete,
  onSelect,
}: SidebarTaskListProps) => {
  const [isEditing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const outerDivRef = useRef<HTMLDivElement>(null);
  const names = [{ name: "Rename list" }, { name: "Delete list" }];

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleInputBlur();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (outerDivRef.current && outerDivRef.current === event.target) {
      onSelect(id);
    }
  };

  return (
    <div ref={outerDivRef} onClick={handleClick} className={styles.taskList}>
      <div className={styles.editableText}>
        {isEditing ? (
          <input
            type="text"
            maxLength={255}
            ref={inputRef}
            className={styles.input}
            value={inputValue}
            onKeyDown={handleKeyDown}
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
        names={names}
        alignment="right"
        className={styles.dropdown}
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
