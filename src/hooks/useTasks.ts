import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Task } from "../components/TaskPanel/TaskPanel";

interface TaskList {
  id: number;
  title: string;
  tasks: Task[];
}

const useTasks = () => {
  const [openTask, setOpenTask] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isMassDelete, setIsMassDelete] = useState<boolean>(false);

  const [taskLists, setTaskLists] = useState<TaskList[]>(() => {
    const savedTaskLists = localStorage.getItem("taskLists");
    return savedTaskLists ? JSON.parse(savedTaskLists) : [];
  });

  const [selectedTaskList, setSelectedTaskList] = useState<TaskList | null>(
    () => {
      const savedSelectedTaskList = localStorage.getItem("selectedTaskList");
      return savedSelectedTaskList ? JSON.parse(savedSelectedTaskList) : null;
    },
  );

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
        localStorage.removeItem("selectedTaskList");
        setSelectedTaskList(null);
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
    taskLists,
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
  };
};

export default useTasks;
