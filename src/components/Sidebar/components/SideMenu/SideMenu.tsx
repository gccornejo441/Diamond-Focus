import React from "react";
import styles from "./SideMenu.module.css";
import ListButton from "@assets/listIcon.svg?react";
import GemLogo from "@assets/gemIcon.svg?react";
import MenuButton from "@assets/menuIcon.svg?react";

interface SideMenuProps {
  isSidebarListOpen: boolean;
  setSidebarListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenu = ({
  isSidebarListOpen,
  setSidebarListOpen,
  setModalOpen,
}: SideMenuProps) => {
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
      <button onClick={() => setModalOpen(true)} className={styles.dropdown}>
        <MenuButton className={styles.topIconSvg} />
      </button>
    </div>
  );
};

export default SideMenu;
