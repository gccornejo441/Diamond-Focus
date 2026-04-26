import { useEffect, useMemo, useState } from "react";
import styles from "./Sidebar.module.css";
import GemLogo from "@assets/gemIcon.svg?react";
import Dropdown from "@components/Dropdown/Dropdown";
import ListMenuButton from "@assets/listMenuIcon.svg?react";
import { Task } from "@components/Sidebar";
import { IconName } from "@utilities/dropDownHelpers";

interface SidebarProps {
  selectedTaskToView: Task | null;
  isOpen: boolean;
  toggleSidebar: (task: Task | null) => void;
  toggleTaskCompletion: (id: number) => void;
  setAsFavorite: (id: number) => void;
  handleDeleteAll: (removeTask: boolean, massDelete: boolean) => void;
  saveEdit: (id: number, newText: string) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
}

const Sidebar = ({
  isOpen,
  toggleSidebar,
  selectedTaskToView,
  toggleTaskCompletion,
  setAsFavorite,
  handleDeleteAll,
  saveEdit,
  updateTask,
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

  useEffect(() => {
    if (selectedTaskToView) {
      setInputValue(selectedTaskToView.text);
    }
  }, [selectedTaskToView]);

  const handleBlur = () => {
    if (selectedTaskToView) {
      saveEdit(selectedTaskToView.id, inputValue);
    }
  };

  const names = useMemo(
    () => [
      { name: "Toggle Task Completion" as IconName },
      { name: "Set as Favorite" as IconName },
      { name: "Delete" as IconName },
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleBlur}
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
          <div className={styles.dueDateSection}>
            <label className={styles.dueDateLabel}>Due Date</label>
            <div className={styles.dueDateRow}>
              <input
                type="datetime-local"
                value={
                  selectedTaskToView?.dueDate
                    ? new Date(selectedTaskToView.dueDate).toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) => {
                  if (selectedTaskToView) {
                    updateTask(selectedTaskToView.id, {
                      dueDate: e.target.value
                        ? new Date(e.target.value).toISOString()
                        : null,
                    });
                  }
                }}
                className={styles.dueDateInput}
                aria-label="Edit due date"
              />
              {selectedTaskToView?.dueDate && (
                <button
                  type="button"
                  onClick={() => {
                    if (selectedTaskToView) {
                      updateTask(selectedTaskToView.id, { dueDate: null });
                    }
                  }}
                  className={styles.clearDueDate}
                  aria-label="Clear due date"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          {selectedTaskToView?.dueDate && (
            <div className={styles.reminderSection}>
              <div className={styles.reminderRow}>
                <label htmlFor="reminder-enabled">Reminder</label>
                <div className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    id="reminder-enabled"
                    checked={selectedTaskToView.reminder?.enabled ?? false}
                    onChange={(e) => {
                      if (selectedTaskToView) {
                        updateTask(selectedTaskToView.id, {
                          reminder: {
                            enabled: e.target.checked,
                            alertBefore: selectedTaskToView.reminder?.alertBefore ?? 15,
                            recurrence: selectedTaskToView.reminder?.recurrence ?? "none",
                            lastNotifiedAt: selectedTaskToView.reminder?.lastNotifiedAt ?? null,
                          },
                        });
                      }
                    }}
                    className={styles.toggleInput}
                  />
                  <label htmlFor="reminder-enabled" className={styles.toggleLabel}></label>
                </div>
              </div>

              {selectedTaskToView.reminder?.enabled && (
                <>
                  <div className={styles.reminderRow}>
                    <label htmlFor="alert-before">Alert before</label>
                    <select
                      id="alert-before"
                      value={selectedTaskToView.reminder?.alertBefore ?? 15}
                      onChange={(e) => {
                        if (selectedTaskToView?.reminder) {
                          updateTask(selectedTaskToView.id, {
                            reminder: { ...selectedTaskToView.reminder, alertBefore: Number(e.target.value) },
                          });
                        }
                      }}
                      className={styles.dueDateInput}
                    >
                      <option value="5">5 minutes</option>
                      <option value="10">10 minutes</option>
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                    </select>
                  </div>

                  <div className={styles.reminderRow}>
                    <label htmlFor="recurrence">Repeat</label>
                    <select
                      id="recurrence"
                      value={selectedTaskToView.reminder?.recurrence ?? "none"}
                      onChange={(e) => {
                        if (selectedTaskToView?.reminder) {
                          updateTask(selectedTaskToView.id, {
                            reminder: {
                              ...selectedTaskToView.reminder,
                              recurrence: e.target.value as "none" | "daily" | "weekly" | "monthly",
                              lastNotifiedAt: null,
                            },
                          });
                        }
                      }}
                      className={styles.dueDateInput}
                    >
                      <option value="none">None</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
