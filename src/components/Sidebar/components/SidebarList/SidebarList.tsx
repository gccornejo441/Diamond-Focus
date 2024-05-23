import { useEffect, useState } from "react";
import styles from "./SidebarList.module.css";
import { SidebarListStateProps } from "../../types/SidebarTypes";
import SidebarTaskList from "./SidebarListTask";
import useSidebarList from "../../hooks/useSidebarList";

import AddListButton from "@assets/addListIcon.svg?react";
import CollapseButton from "@assets/collapseIcon.svg?react";
import SidebarRightButton from "@assets/sidebarRightIcon.svg?react";
import { initialTaskLists } from "@utilities/helpers";
import Popup from "@components/Popup/Popup";
import DeleteModal from "@components/DeleteModal";

const SidebarList = ({
  setCurrentSelectedTaskList,
  isSidebarListOpen,
  setSidebarListOpen,
}: SidebarListStateProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {
    taskLists,
    addTaskList,
    handleTitleChange,
    handleTaskListDelete,
    handleTaskListSelect,
    setDeletingTaskListId,
    deletingTaskListId,
    selectedTaskListObj,
    setSelectedTaskListObj,
  } = useSidebarList({ initialTaskLists });
  const [openTask, setOpenTask] = useState(false);

  useEffect(() => {
    if (selectedTaskListObj || selectedTaskListObj == null) {
      setCurrentSelectedTaskList(selectedTaskListObj);
    }
  }, [selectedTaskListObj, setSelectedTaskListObj]);

  const handleCancel = () => {
    setOpenTask(false);
  };

  const onDelete = (id: number) => {
    setDeletingTaskListId(id);
    setOpenTask(true);
  };

  const onSelect = (id: number) => {
    handleTaskListSelect(id);
  };

  const handleConfirmDelete = () => {
    if (deletingTaskListId == null) return;
    handleTaskListDelete(deletingTaskListId);
    setOpenTask(false);
    setDeletingTaskListId(null);
  };

  const handleToggleClick = () => {
    setIsCollapsed(!isCollapsed);
    setSidebarListOpen(!isSidebarListOpen);
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
          onClick={handleToggleClick}
        >
          <CollapseButton
            className={`${styles.svgStyle} ${
              isCollapsed ? styles.collapsed : ""
            }`}
          />
        </button>
        <div className={styles.sidebarListControls}>
          <button onClick={addTaskList} className="controlButton">
            <AddListButton className={styles.svgStyle} />
          </button>
          <button
            aria-label="Toggle Button"
            aria-expanded={isSidebarListOpen}
            aria-controls="sidebar-list"
            id="toggle-button"
            className="controlButton"
            onClick={handleToggleClick}
          >
            <SidebarRightButton
              className={`${styles.sidebarSvg} ${
                isCollapsed ? styles.collapsed : ""
              }`}
            />
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
