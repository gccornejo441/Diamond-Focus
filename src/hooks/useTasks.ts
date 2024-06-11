import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Task, TaskListProps } from "@components/Sidebar";

const useTasks = () => {
  const [currentSelectedTaskList, setCurrentSelectedTaskList] =
    useState<TaskListProps | null>(() => {
      const storedItem = localStorage.getItem("taskLists");
      if (!storedItem) return null;
      const selectedTaskList = JSON.parse(storedItem).find(
        (list: TaskListProps) => list.taskSelected === true
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
    if (selectedTaskList) {
      const updatedTaskLists = taskLists.map((list) =>
        list.id === selectedTaskList.id ? selectedTaskList : list
      );

      setTaskLists(updatedTaskLists);
      localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
    }
  }, [selectedTaskList]);

  const tasks = currentSelectedTaskList ? currentSelectedTaskList.tasks : [];

  const setTasks: Dispatch<SetStateAction<Task[]>> = (newTasks) => {
    if (currentSelectedTaskList) {
      const updatedTaskList = {
        ...currentSelectedTaskList,
        tasks:
          typeof newTasks === "function"
            ? newTasks(currentSelectedTaskList.tasks)
            : newTasks,
      };
      setSelectedTaskList(updatedTaskList);
      setCurrentSelectedTaskList(updatedTaskList);
      const updatedTaskLists = taskLists.map((list) =>
        list.id === updatedTaskList.id ? updatedTaskList : list
      );
      setTaskLists(updatedTaskLists);
      localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
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

  const moveTaskToList = (taskId: number, newListId: number) => {
    const taskToMove = tasks.find((task) => task.id === taskId);
    if (!taskToMove) return;

    const updatedCurrentListTasks = tasks.filter((task) => task.id !== taskId);
    const updatedTaskLists = taskLists.map((list) => {
      if (list.id === currentSelectedTaskList?.id) {
        return { ...list, tasks: updatedCurrentListTasks };
      }
      if (list.id === newListId) {
        return { ...list, tasks: [...list.tasks, taskToMove] };
      }
      return list;
    });

    setTaskLists(updatedTaskLists);

    const updatedCurrentTaskList = updatedTaskLists.find((taskList) => {
      return taskList.id === currentSelectedTaskList?.id;
    });
    if (!updatedCurrentTaskList) return;
    setCurrentSelectedTaskList(updatedCurrentTaskList);
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const setAsFavorite = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, favorite: !task.favorite } : task
    );
    setTasks(updatedTasks);
  };

  const saveEdit = (id: number, newText: string) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, text: newText } : t
    );
    setTasks(updatedTasks);
  };

  return {
    saveEdit,
    setAsFavorite,
    toggleTaskCompletion,
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
    currentSelectedTaskList,
    setCurrentSelectedTaskList,
    moveTaskToList,
  };
};

export default useTasks;
