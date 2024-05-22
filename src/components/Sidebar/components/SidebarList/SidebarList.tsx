import { useEffect, useState } from "react";
import styles from "./SidebarList.module.css";
import { SidebarListStateProps } from "../../types/SidebarTypes";
import SidebarTaskList from "./SidebarListTask";
import useSidebarList from "../../hooks/useSidebarList";

import AddListButton from "@assets/addListIcon.svg?react";
import ToggleIcon from "@assets/toggleIcon.svg?react";
import { initialTaskLists } from "@utilities/helpers";
import Popup from "@components/Popup/Popup";
import DeleteModal from "@components/DeleteModal";

const SidebarList = ({
  setCurrentSelectedTaskList,
  isSidebarListOpen,
  setSidebarListOpen,
}: SidebarListStateProps) => {
  const {
    taskLists,
    addTaskList,
    handleTitleChange,
    handleTaskListDelete,
    handleTaskListSelect,
    setDeletingTaskList,
    deletingTaskList,
    selectedTaskListObj,
  } = useSidebarList({ initialTaskLists });
  const [openTask, setOpenTask] = useState(false);

  useEffect(() => {
    if (selectedTaskListObj) {
      setCurrentSelectedTaskList(selectedTaskListObj);
    }
  }, [selectedTaskListObj]);

  const handleCancel = () => {
    setOpenTask(false);
  };

  const onDelete = (id: number) => {
    setDeletingTaskList(id);
    setOpenTask(true);
  };

  const onSelect = (id: number) => {
    handleTaskListSelect(id);
  };

  const handleConfirmDelete = () => {
    if (deletingTaskList == null) return;
    handleTaskListDelete(deletingTaskList);
    setOpenTask(false);
    setDeletingTaskList(null);
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
          aria-label="Toggle Button"
          aria-expanded={isSidebarListOpen}
          aria-controls="sidebar-list"
          id="toggle-button"
          className={styles.toggleButton}
          onClick={() => setSidebarListOpen(!isSidebarListOpen)}
        >
          <ToggleIcon className={styles.toggleIcon} aria-label="Toggle Icon" />
        </button>
        <div className={styles.sidebarListControls}>
          <button onClick={addTaskList} className="controlButton">
            <AddListButton className={styles.svgStyle} />
          </button>
        </div>
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
