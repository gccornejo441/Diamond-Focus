import { useState } from "react";
const useSidebarListToggle = () => {
  const [isSidebarListOpen, setSidebarListOpen] = useState<boolean>(false);

  return {
    isSidebarListOpen,
    setSidebarListOpen,
  };
};

export default useSidebarListToggle;
