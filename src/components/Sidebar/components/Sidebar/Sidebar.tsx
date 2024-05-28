import { useEffect } from "react";
import styles from "./Sidebar.module.css";
import GemLogo from "@assets/gemIcon.svg?react";

interface SidebarProps {
  taskDescription: string;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar, taskDescription }: SidebarProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebarElement = document.querySelector(`.${styles.sidebar}`);
      if (sidebarElement && !sidebarElement.contains(event.target as Node)) {
        toggleSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <div className={isOpen ? `${styles.overlay}` : ""}>
      <div
        className={
          isOpen
            ? `${styles.sidebar} ${styles.open}`
            : `${styles.sidebar} ${styles.closed}`
        }
      >
        <nav>
          <GemLogo aria-label="Gem Icon" className={styles.icon} />
          <h2 className={styles.sideBarTitle}>Diamond Focus</h2>
          <p>{taskDescription}</p>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
