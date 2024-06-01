import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Task, TaskListProps } from "@components/Sidebar";

const useTasks = () => {
  const [currentSelectedTaskList, setCurrentSelectedTaskList] =
    useState<TaskListProps | null>(() => {
      const storedItem = localStorage.getItem("taskLists");
      if (!storedItem) return null;
      const selectedTaskList = JSON.parse(storedItem).find(
        (list: TaskListProps) => list.taskSelected === true,
      );
      return selectedTaskList ? selectedTaskList : null;
    });

  const [openTask, setOpenTask] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isMassDelete, setIsMassDelete] = useState<boolean>(false);
  const [taskLists, setTaskLists] = useState<TaskListProps[]>(() => {
    const savedTaskLists = localStorage.getItem("taskLists");
    return savedTaskLists ? JSON.parse(savedTaskLists) : [];
  });

  const [selectedTaskList, setSelectedTaskList] =
    useState<TaskListProps | null>(currentSelectedTaskList);

  useEffect(() => {
    if (currentSelectedTaskList || currentSelectedTaskList == null) {
      setSelectedTaskList(currentSelectedTaskList);
    }
  }, [currentSelectedTaskList]);

  useEffect(() => {
    localStorage.setItem("taskLists", JSON.stringify(taskLists));
  }, [taskLists]);

  useEffect(() => {
    if (selectedTaskList) {
      const updatedTaskLists = taskLists.map((list) =>
        list.id === selectedTaskList.id ? selectedTaskList : list,
      );

      setTaskLists(updatedTaskLists);
      localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
    }
  }, [selectedTaskList]);

  const tasks = selectedTaskList ? selectedTaskList.tasks : [];

  const setTasks: Dispatch<SetStateAction<Task[]>> = (newTasks) => {
    if (selectedTaskList) {
      const updatedTaskList = {
        ...selectedTaskList,
        tasks:
          typeof newTasks === "function"
            ? newTasks(selectedTaskList.tasks)
            : newTasks,
      };
      setSelectedTaskList(updatedTaskList);
      localStorage.setItem("taskLists", JSON.stringify(updatedTaskList));
    }
  };

  const deleteTask = (id: number) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== id));
  };

  const handleDeleteAll = (removeTask: boolean, massDelete: boolean) => {
    setIsMassDelete(massDelete);

    if (massDelete) {
      setOpenTask(true);
      if (removeTask) {
        localStorage.removeItem("tasks");
        setTasks([]);
        setOpenTask(false);
        setIsMassDelete(false);
      }
    } else {
      setOpenTask(true);
      if (!currentTask) return null;
      if (removeTask) {
        deleteTask(currentTask.id);
        setOpenTask(false);
        setIsMassDelete(false);
      }
    }
  };

  return {
    setTaskLists,
    selectedTaskList,
    setSelectedTaskList,
    tasks,
    setTasks,
    handleDeleteAll,
    openTask,
    setOpenTask,
    isMassDelete,
    currentTask,
    setCurrentTask,
    currentSelectedTaskList,
    setCurrentSelectedTaskList,
  };
};

export default useTasks;
