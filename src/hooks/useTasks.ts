import { useState } from "react";
import { Task } from "../components/TaskPanel/TaskPanel";

const useTasks = () => {
  const [openTask, setOpenTask] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isMassDelete, setIsMassDelete] = useState<boolean>(false);

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
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
