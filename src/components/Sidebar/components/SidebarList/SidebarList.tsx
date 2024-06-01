import { useEffect, useState } from "react";
import styles from "./SidebarList.module.css";
import { SidebarListStateProps, TaskListProps } from "../../types/SidebarTypes";
import SidebarTaskList from "./SidebarListTask";
import AddListButton from "@assets/addListIcon.svg?react";
import SidebarRightButton from "@assets/sidebarRightIcon.svg?react";
import Popup from "@components/Popup/Popup";
import DeleteModal from "@components/DeleteModal";
import { Tooltip } from "react-tooltip";

const SidebarList = ({
  setCurrentSelectedTaskList,
  isSidebarListOpen,
  setSidebarListOpen,
  taskLists,
  setTaskLists,
}: SidebarListStateProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [deletingTaskListId, setDeletingTaskListId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const storedTaskLists = localStorage.getItem("taskLists");
    if (storedTaskLists) {
      setTaskLists(JSON.parse(storedTaskLists));
    }
  }, [setTaskLists]);

  useEffect(() => {
    localStorage.setItem("taskLists", JSON.stringify(taskLists));
  }, [taskLists]);

  const updateLocalStorageTaskLists = (updatedTaskLists: TaskListProps[]) => {
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
  };

  const addTaskList = () => {
    const newTaskList = {
      id: taskLists.length,
      title: "New List",
      taskSelected: false,
      tasks: [
        {
          id: 0,
          text: "New Task",
          completed: false,
          favorite: false,
          createdAt: new Date(),
        },
      ],
    } as TaskListProps;

    const updatedTaskLists = [...taskLists, newTaskList] as TaskListProps[];
    setTaskLists(updatedTaskLists);
    updateLocalStorageTaskLists(updatedTaskLists);
  };

  const handleTitleChange = (id: number, newTitle: string) => {
    const updatedTaskLists = taskLists.map((list) => ({
      ...list,
      title: list.id === id ? newTitle : list.title,
    })) as TaskListProps[];

    setTaskLists(updatedTaskLists);
    updateLocalStorageTaskLists(updatedTaskLists);

    const updatedSelectedTaskList = updatedTaskLists.find(
      (list) => list.id === id,
    );

    if (updatedSelectedTaskList) {
      setCurrentSelectedTaskList(updatedSelectedTaskList);
    }
  };

  const handleTaskListDelete = (id: number) => {
    const updatedTaskLists = taskLists.filter((list) => list.id !== id);
    setTaskLists(updatedTaskLists);
    updateLocalStorageTaskLists(updatedTaskLists);

    const updatedSelectedTaskList = updatedTaskLists[0] || null;
    setCurrentSelectedTaskList(updatedSelectedTaskList);
  };

  const handleTaskListSelect = (id: number) => {
    const updatedTaskLists = taskLists.map((list) =>
      list.id === id
        ? { ...list, taskSelected: true }
        : { ...list, taskSelected: false },
    );

    const selectedTaskList = updatedTaskLists.find(
      (list) => list.id === id,
    ) as TaskListProps;

    setTaskLists(updatedTaskLists);
    setCurrentSelectedTaskList(selectedTaskList);
    updateLocalStorageTaskLists(updatedTaskLists);
  };

  const handleCancel = () => {
    setOpenTask(false);
  };

  const onDelete = (id: number) => {
    setDeletingTaskListId(id);
    setOpenTask(true);
  };

  const onSelect = (id: number) => {
    handleTaskListSelect(id);
    setIsCollapsed(!isCollapsed);
    setSidebarListOpen(!isSidebarListOpen);
  };

  const handleConfirmDelete = () => {
    if (deletingTaskListId == null) return;
    handleTaskListDelete(deletingTaskListId);
    handleToggleClick();
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
          <button
            data-tooltip-delay-show={500}
            data-tooltip-id="toggleTooltip"
            data-tooltip-place="bottom"
            data-tooltip-content={
              !isSidebarListOpen ? "Open Sidebar" : "Close Sidebar"
            }
            aria-label="Toggle Button"
            aria-expanded={isSidebarListOpen}
            aria-controls="sidebar-list"
            id="toggle-button"
            className={`controlButton ${styles.desktopToggleButton}`}
            onClick={handleToggleClick}
          >
            <SidebarRightButton
              className={`${styles.svgStyle} ${
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
      <Tooltip className="tooltipStyles" id="toggleTooltip" />
      <Tooltip className="tooltipStyles" id="sidebarTooltip" />
    </div>
  );
};

export default SidebarList;
