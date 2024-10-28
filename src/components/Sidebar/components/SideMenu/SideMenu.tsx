import React, { useEffect } from "react";
import styles from "./SideMenu.module.css";
import ListButton from "@assets/listIcon.svg?react";
import GemLogo from "@assets/gemIcon.svg?react";

interface SideMenuProps {
  isSidebarListOpen: boolean;
  setSidebarListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenu = ({ isSidebarListOpen, setSidebarListOpen }: SideMenuProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "b") {
        setSidebarListOpen((prevState) => !prevState);
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setSidebarListOpen]);

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
      <a href="/" className={styles.gemIcon}>
        <GemLogo aria-label="Gem Icon" className={styles.topIconSvg} />
      </a>
    </div>
  );
};

export default SideMenu;
