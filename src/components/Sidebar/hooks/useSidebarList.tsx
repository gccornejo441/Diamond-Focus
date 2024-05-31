import { useState, useEffect } from "react";
import { TaskListProps } from "../types/SidebarTypes";

type Props = {
  initialTaskLists: () => TaskListProps[];
};

const useSidebarList = ({ initialTaskLists }: Props) => {
  const [taskLists, setTaskLists] =
    useState<TaskListProps[]>(initialTaskLists());
  const [deletingTaskListId, setDeletingTaskListId] = useState<number | null>(
    null,
  );
  const [selectedTaskListObj, setSelectedTaskListObj] =
    useState<TaskListProps | null>(() => {
      const storedSelectedTaskList = localStorage.getItem("selectedTaskList");
      const initialTaskList = taskLists.find((list) => list.id === 0);
      return storedSelectedTaskList
        ? JSON.parse(storedSelectedTaskList)
        : initialTaskList;
    });

  useEffect(() => {
    const storedTaskLists = localStorage.getItem("taskLists");
    if (storedTaskLists) {
      setTaskLists(JSON.parse(storedTaskLists));
    }
  }, []);

  useEffect(() => {
    if (selectedTaskListObj) {
      localStorage.setItem(
        "selectedTaskList",
        JSON.stringify(selectedTaskListObj),
      );
    } else {
      localStorage.removeItem("selectedTaskList");
    }
  }, [selectedTaskListObj]);

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
    const storedTaskLists = localStorage.getItem("taskLists");
    if (!storedTaskLists) return;
    const storedTaskListsJson = JSON.parse(storedTaskLists) as TaskListProps[];

    const updatedTaskLists = storedTaskListsJson.map((list) => ({
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

    const updatedSelectedTaskList = updatedTaskLists[0] || null;
    if (updatedSelectedTaskList) {
      setSelectedTaskListObj(updatedSelectedTaskList);
      localStorage.setItem(
        "selectedTaskList",
        JSON.stringify(updatedSelectedTaskList),
      );
    } else {
      setSelectedTaskListObj(null);
      localStorage.removeItem("selectedTaskList");
      localStorage.removeItem("tasks");
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
    deletingTaskListId,
    setDeletingTaskListId,
    selectedTaskListObj,
    setSelectedTaskListObj,
  };
};

export default useSidebarList;
