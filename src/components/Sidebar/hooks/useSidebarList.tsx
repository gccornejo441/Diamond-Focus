import { useState, useEffect } from "react";
import { TaskListProps } from "../types/SidebarTypes";

type Props = {
  initialTaskLists: () => TaskListProps[];
};

const useSidebarList = ({ initialTaskLists }: Props) => {
  const [taskLists, setTaskLists] =
    useState<TaskListProps[]>(initialTaskLists());
  const [deletingTaskList, setDeletingTaskList] = useState<number | null>(null);
  const [selectedTaskListObj, setSelectedTaskListObj] =
    useState<TaskListProps | null>(() => {
      const storedSelectedTaskList = localStorage.getItem("selectedTaskList");
      return storedSelectedTaskList ? JSON.parse(storedSelectedTaskList) : null;
    });

  useEffect(() => {
    const storedTaskLists = localStorage.getItem("taskLists");
    if (storedTaskLists) {
      setTaskLists(JSON.parse(storedTaskLists));
    }
  }, []);

  const addTaskList = () => {
    const newTaskList = {
      id: taskLists.length,
      title: "New List",
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

    const updatedTaskLists = [...taskLists, newTaskList];
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
    setTaskLists(updatedTaskLists);
  };

  const handleTitleChange = (id: number, newTitle: string) => {
    const updatedTaskLists = taskLists.map((list) => ({
      ...list,
      title: list.id === id ? newTitle : list.title,
    }));

    setTaskLists(updatedTaskLists);
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));

    const updatedSelectedTaskList = updatedTaskLists.find(
      (list) => list.id === id,
    );
    if (updatedSelectedTaskList) {
      setSelectedTaskListObj(updatedSelectedTaskList);
      localStorage.setItem(
        "selectedTaskList",
        JSON.stringify(updatedSelectedTaskList),
      );
    }
  };

  const handleTaskListDelete = (id: number) => {
    const updatedTaskLists = taskLists.filter((list) => list.id !== id);
    setTaskLists(updatedTaskLists);
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
    if (selectedTaskListObj && selectedTaskListObj.id === id) {
      setSelectedTaskListObj(null);
      localStorage.removeItem("selectedTaskList");
    }
  };

  const handleTaskListSelect = (id: number) => {
    const selectedTaskList = taskLists.find((list) => list.id === id);
    if (selectedTaskList) {
      setSelectedTaskListObj(selectedTaskList);
      localStorage.setItem(
        "selectedTaskList",
        JSON.stringify(selectedTaskList),
      );
    }
  };

  return {
    taskLists,
    addTaskList,
    handleTitleChange,
    handleTaskListDelete,
    handleTaskListSelect,
    deletingTaskList,
    setDeletingTaskList,
    selectedTaskListObj,
    setSelectedTaskListObj,
  };
};

export default useSidebarList;
