import { useState } from "react";
import { CurrentSelectedTaskProps, TaskListProps } from "../export";

const useSidebarListToggle = (): CurrentSelectedTaskProps => {
  const [isSidebarListOpen, setSidebarListOpen] = useState<boolean>(false);
  const [currentSelectedTaskList, setCurrentSelectedTaskList] =
    useState<TaskListProps | null>(() => {
      const storedItem = localStorage.getItem("selectedTaskList");
      return storedItem ? JSON.parse(storedItem) : null;
    });

  return {
    isSidebarListOpen,
    setSidebarListOpen,
    currentSelectedTaskList,
    setCurrentSelectedTaskList,
  };
};

export default useSidebarListToggle;
