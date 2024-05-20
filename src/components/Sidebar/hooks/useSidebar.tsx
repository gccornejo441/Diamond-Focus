import { useState } from "react";
import { TaskListProps } from "../types/SidebarTypes";

type Props = {
  initialTaskLists: () => TaskListProps[];
};

const useSidebarList = ({ initialTaskLists }: Props) => {
  const [taskLists, setTaskLists] =
    useState<TaskListProps[]>(initialTaskLists());

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
    const updatedTaskLists = taskLists.map((list) => {
      if (list.id === id) {
        return { ...list, title: newTitle };
      }
      return list;
    });
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
    setTaskLists(updatedTaskLists);
  };

  const handleTaskListDelete = (id: number) => {
    const updatedTaskLists = taskLists.filter((list) => list.id !== id);
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
    setTaskLists(updatedTaskLists);
  };

  const handleTaskListSelect = (id: number) => {
    const selectedTaskList = taskLists.find((list) => list.id === id);
    if (selectedTaskList) {
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
  };
};

export default useSidebarList;
