import { useState } from "react";
import styles from "./SidebarList.module.css";
import { SidebarProps } from "../../types/SidebarTypes";
import SidebarTaskList from "./SidebarListTask";
import useSidebarList from "../../hooks/useSidebar";
import ToggleIcon from "@assets/toggleIcon.svg?react";
import { initialTaskLists } from "@utilities/helpers";
import Popup from "@components/Popup/Popup";
import DeleteModal from "@components/DeleteModal";

const SidebarList = ({
  setCurrentSelectedTaskList,
  isSidebarListOpen,
  setSidebarListOpen,
}: SidebarProps) => {
  const {
    taskLists,
    addTaskList,
    handleTitleChange,
    handleTaskListDelete,
    handleTaskListSelect,
    setDeletingTaskList,
    deletingTaskList,
  } = useSidebarList({ initialTaskLists });
  const [openTask, setOpenTask] = useState(false);

  const handleCancel = () => {
    setOpenTask(false);
  };

  const onDelete = (id: number) => {
    setDeletingTaskList(id);
    setOpenTask(true);
  };

  const onSelect = (id: number) => {
    setCurrentSelectedTaskList(id);
    handleTaskListSelect(id);
  };

  const handleConfirmDelete = () => {
    if (deletingTaskList) {
      handleTaskListDelete(deletingTaskList);
      setOpenTask(false);
      setDeletingTaskList(null);
    }
  };

  return (
    <div>
      <Popup onClose={() => setOpenTask(false)} isOpen={openTask}>
        <DeleteModal
          handleDelete={handleConfirmDelete}
          handleCancel={handleCancel}
          isMassDelete={false}
          overrideCaption="Are you should you want to delete this list and all it's content?"
        />
      </Popup>
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
            onDelete={onDelete}
            onSelect={onSelect}
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
