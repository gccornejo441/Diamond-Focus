import styles from "./SidebarList.module.css";
import { SidebarListStateProps } from "../../types/SidebarTypes";
import SidebarTaskList from "./SidebarListTask";
import AddListButton from "@assets/addListIcon.svg?react";
import Popup from "@components/Popup/Popup";
import DeleteModal from "@components/DeleteModal";
import useSidebarList from "@components/Sidebar/hooks/useSidebarList";

const SidebarList = ({
  setCurrentSelectedTaskList,
  isSidebarListOpen,
  setSidebarListOpen,
  taskLists,
  setTaskLists,
}: SidebarListStateProps) => {
  const {
    openTask,
    setOpenTask,
    handleConfirmDelete,
    handleCancel,
    addTaskList,
    handleTitleChange,
    onDelete,
    onSelect,
  } = useSidebarList({
    taskLists,
    setTaskLists,
    setCurrentSelectedTaskList,
    isSidebarListOpen,
    setSidebarListOpen,
  });

  return (
    <div className={styles.sidebarList}>
      <Popup onClose={() => setOpenTask(false)} isOpen={openTask}>
        <DeleteModal
          handleDelete={handleConfirmDelete}
          handleCancel={handleCancel}
          isMassDelete={false}
          overrideCaption="Are you sure you want to delete this list and all its content?"
        />
      </Popup>
      <div
        className={
          isSidebarListOpen
            ? `${styles.sidebar} ${styles.open}`
            : styles.sidebar
        }
      >
        <div className={styles.sidebarListControls}>
          <button
            aria-label="Add List"
            aria-controls="sidebar-list"
            id="add-list-button"
            onClick={addTaskList}
            className="controlButton"
          >
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
