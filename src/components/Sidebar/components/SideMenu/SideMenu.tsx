import React from "react";
import styles from "./SideMenu.module.css";
import ListButton from "@assets/listIcon.svg?react";

interface SideMenuProps {
  isSidebarListOpen: boolean;
  setSidebarListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenu = ({ isSidebarListOpen, setSidebarListOpen }: SideMenuProps) => {
  return (
    <div
      className={`${styles.sideMenu} ${isSidebarListOpen ? styles.open : ""}`}
    >
      <button
        aria-label="Toggle Sidebar"
        aria-controls="toggle-sidebar"
        id="toggle-sidebar"
        className={styles.topIcon}
        onClick={() => setSidebarListOpen(true)}
      >
        <ListButton className={styles.topIconSvg} />
      </button>
    </div>
  );
};

export default SideMenu;
