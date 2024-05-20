import ToggleIcon from "@assets/toggleIcon.svg?react";
import { initialTaskLists } from "../../../../utils";
import styles from "./SidebarList.module.css";
import { SidebarProps } from "../../types/SidebarTypes";
import SidebarTaskList from "./SidebarListTask";
import useSidebarList from "../../hooks/useSidebar";

const SidebarList = ({
  isSidebarListOpen,
  setSidebarListOpen,
}: SidebarProps) => {
  const {
    taskLists,
    addTaskList,
    handleTitleChange,
    handleTaskListDelete,
    handleTaskListSelect,
  } = useSidebarList({ initialTaskLists });
  return (
    <div>
      <div
        className={
          isSidebarListOpen
            ? `${styles.sidebar} ${styles.open}`
            : styles.sidebar
        }
      >
        <button
          className={styles.toggleButton}
          onClick={() => setSidebarListOpen(!isSidebarListOpen)}
        >
          <ToggleIcon className={styles.toggleIcon} aria-label="Toggle Icon" />
        </button>
        <button onClick={addTaskList} className={styles.addButton}>
          Add List
        </button>
        {taskLists.map((list) => (
          <SidebarTaskList
            key={list.id}
            id={list.id}
            value={list.title}
            onTitleChange={handleTitleChange}
            onDelete={handleTaskListDelete}
            onSelect={handleTaskListSelect}
          />
        ))}
      </div>
      {isSidebarListOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarListOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default SidebarList;
