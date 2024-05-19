import { useState } from "react";
import { Task, TaskListProps } from "../types/SidebarTypes";

type Props = {
  initialTaskLists: () => TaskListProps[];
};

const useSidebarList = ({ initialTaskLists }: Props) => {
  const [taskLists, setTaskLists] = useState<TaskListProps[]>(initialTaskLists);

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

  const addTaskToList = (listId: number, task: Task) => {
    const updatedTaskLists = taskLists.map((list) => {
      if (list.id === listId) {
        return { ...list, tasks: [...list.tasks, task] };
      }
      return list;
    });
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
    setTaskLists(updatedTaskLists);
  };

  const addTaskToCurrentList = (task: Task) => {
    const updatedTaskLists = taskLists.map((list) => {
      if (list.id === 0) {
        return { ...list, tasks: [...list.tasks, task] };
      }
      return list;
    });
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
    setTaskLists(updatedTaskLists);
  };

  return {
    taskLists,
    addTaskList,
    handleTitleChange,
    addTaskToList,
    setTaskLists,
    addTaskToCurrentList,
  };
};

export default useSidebarList;
