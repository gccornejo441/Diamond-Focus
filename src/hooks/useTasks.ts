import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Task } from "../components/TaskPanel/TaskPanel";
import { TaskListProps } from "@components/Sidebar/export";

const useTasks = () => {
  const [currentSelectedTaskList, setCurrentSelectedTaskList] =
    useState<TaskListProps | null>(() => {
      const storedItem = localStorage.getItem("selectedTaskList");
      return storedItem ? JSON.parse(storedItem) : null;
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
      localStorage.setItem(
        "selectedTaskList",
        JSON.stringify(selectedTaskList),
      );
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

      const updatedTaskLists = taskLists.map((list) =>
        list.id === selectedTaskList.id ? updatedTaskList : list,
      );
      setTaskLists(updatedTaskLists);
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
      if (removeTask && currentTask && currentTask.id) {
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
