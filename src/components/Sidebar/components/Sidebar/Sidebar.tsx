import { useEffect, useMemo, useState } from "react";
import styles from "./Sidebar.module.css";
import GemLogo from "@assets/gemIcon.svg?react";
import Dropdown from "@components/Dropdown/Dropdown";
import ListMenuButton from "@assets/listMenuIcon.svg?react";
import { Task } from "@components/Sidebar";

interface SidebarProps {
  selectedTaskToView: Task | null;
  isOpen: boolean;
  toggleSidebar: (task: Task | null) => void;
  toggleTaskCompletion: (id: number) => void;
  setAsFavorite: (id: number) => void;
  handleDeleteAll: (removeTask: boolean, massDelete: boolean) => void;
  saveEdit: (id: number, newText: string) => void;
}

const Sidebar = ({
  isOpen,
  toggleSidebar,
  selectedTaskToView,
  toggleTaskCompletion,
  setAsFavorite,
  handleDeleteAll,
  saveEdit,
}: SidebarProps) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebarElement = document.querySelector(`.${styles.sidebar}`);
      if (sidebarElement && !sidebarElement.contains(event.target as Node)) {
        toggleSidebar(null);
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && selectedTaskToView) {
        event.preventDefault();
        saveEdit(selectedTaskToView.id, inputValue);
      }
    };

    const textareaElement = document.querySelector("textarea");
    textareaElement?.addEventListener("keydown", handleKeyDown);

    return () => {
      textareaElement?.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputValue, selectedTaskToView, saveEdit]);

  const names = useMemo(
    () => [
      { name: "Toggle Task Completion" },
      { name: "Set as Favorite" },
      { name: "Delete" },
    ],
    []
  );

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
          <div className={styles.inputArea}>
            <textarea
              value={selectedTaskToView?.text}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
            />
            <Dropdown
              names={names}
              alignment="right"
              className={styles.dropdown}
              stateHandlers={{
                "Toggle Task Completion": () =>
                  selectedTaskToView &&
                  toggleTaskCompletion(selectedTaskToView.id),
                "Set as Favorite": () =>
                  selectedTaskToView && setAsFavorite(selectedTaskToView.id),
                Delete: () => handleDeleteAll(false, false),
              }}
            >
              <ListMenuButton className={styles.svgStyle} />
            </Dropdown>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
