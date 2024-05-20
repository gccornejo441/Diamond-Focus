import { useState } from "react";
import { SidebarProps } from "../export";

const useSidebarListToggle = (): SidebarProps => {
  const [isSidebarListOpen, setSidebarListOpen] = useState<boolean>(false);
  return { isSidebarListOpen, setSidebarListOpen };
};

export default useSidebarListToggle;
