import { useState } from "react";
import { CurrentSelectedTaskProps } from "../export";

const useSidebarListToggle = (): CurrentSelectedTaskProps => {
  const [isSidebarListOpen, setSidebarListOpen] = useState<boolean>(false);
  const [currentSelectedTaskList, setCurrentSelectedTaskList] =
    useState<number>(0);

  return {
    isSidebarListOpen,
    setSidebarListOpen,
    currentSelectedTaskList,
    setCurrentSelectedTaskList,
  };
};

export default useSidebarListToggle;
