import { useEffect, useState } from "react";
import { TaskListProps } from "@components/Sidebar";

interface TaskListWithTasks {
  taskLists: TaskListProps[];
  setTaskLists: React.Dispatch<React.SetStateAction<TaskListProps[]>>;
  setCurrentSelectedTaskList: React.Dispatch<
    React.SetStateAction<TaskListProps | null>
  >;
  isSidebarListOpen: boolean;
  setSidebarListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useSidebarList = ({
  taskLists,
  setTaskLists,
  setCurrentSelectedTaskList,
  isSidebarListOpen,
  setSidebarListOpen,
}: TaskListWithTasks) => {
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
    const updatedTaskLists = taskLists.map((list: TaskListProps) => ({
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
    const updatedTaskLists = taskLists.filter(
      (list: TaskListProps) => list.id !== id,
    );
    setTaskLists(updatedTaskLists);
    updateLocalStorageTaskLists(updatedTaskLists);

    const updatedSelectedTaskList = updatedTaskLists[0] || null;
    setCurrentSelectedTaskList(updatedSelectedTaskList);
  };

  const handleTaskListSelect = (id: number) => {
    const updatedTaskLists = taskLists.map((list: TaskListProps) =>
      list.id === id
        ? { ...list, taskSelected: true }
        : { ...list, taskSelected: false },
    );
    const selectedTaskList = updatedTaskLists.find(
      (list: TaskListProps) => list.id === id,
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

  return {
    openTask,
    setOpenTask,
    handleConfirmDelete,
    handleCancel,
    addTaskList,
    handleToggleClick,
    isCollapsed,
    handleTitleChange,
    onDelete,
    onSelect,
  };
};

export default useSidebarList;
