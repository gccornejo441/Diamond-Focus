import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { TaskListProps, Task } from "@components/Sidebar";
import { SettingsProps } from "@components/Setting";
import { Toast } from "@utilities/helpers";
import { parseISO, differenceInMinutes } from "date-fns";

export const NOTIFICATION_POLL_INTERVAL_MS = 60_000;
const MAX_TOASTS_PER_TICK = 3;

function shouldNotify(task: Task, defaultAlertBefore: number, now: Date): boolean {
  if (!task.dueDate || task.completed) return false;
  const reminder = task.reminder;
  const alertBefore = reminder?.enabled ? reminder.alertBefore : defaultAlertBefore;
  const due = parseISO(task.dueDate);
  const threshold = new Date(due.getTime() - alertBefore * 60_000);
  if (now < threshold) return false;
  if (reminder?.lastNotifiedAt) {
    const lastNotified = parseISO(reminder.lastNotifiedAt);
    const recurrence = reminder.recurrence || "none";
    const hoursSinceLast = differenceInMinutes(now, lastNotified) / 60;
    if (recurrence === "none") return false;
    if (recurrence === "daily" && hoursSinceLast < 24) return false;
    if (recurrence === "weekly" && hoursSinceLast < 24 * 7) return false;
    if (recurrence === "monthly" && hoursSinceLast < 24 * 30) return false;
  }
  return true;
}

function fireNotification(task: Task, useBrowser: boolean): void {
  const message = `Task "${task.text}" is due!`;
  Toast(message);
  if (useBrowser && "Notification" in window && Notification.permission === "granted") {
    new Notification("Diamond Focus", { body: message });
  }
}

const useTaskDueNotifications = (
  taskLists: TaskListProps[],
  settings: SettingsProps | null,
  setTaskLists: Dispatch<SetStateAction<TaskListProps[]>>,
) => {
  const taskListsRef = useRef(taskLists);
  taskListsRef.current = taskLists;

  useEffect(() => {
    if (!settings?.isDueDateNotificationsOn) return;

    const check = () => {
      const now = new Date();
      let notifiedCount = 0;
      let updated = false;
      const updatedLists = taskListsRef.current.map((list) => ({
        ...list,
        tasks: list.tasks.map((task) => {
          if (notifiedCount >= MAX_TOASTS_PER_TICK) return task;
          if (!shouldNotify(task, settings.defaultAlertBefore, now)) return task;
          fireNotification(task, settings.useBrowserNotifications);
          notifiedCount++;
          updated = true;
          return {
            ...task,
            reminder: {
              ...(task.reminder || {
                enabled: false,
                alertBefore: settings.defaultAlertBefore,
                recurrence: "none" as const,
              }),
              lastNotifiedAt: now.toISOString(),
            },
          };
        }),
      }));
      if (updated) {
        setTaskLists(updatedLists);
        localStorage.setItem("taskLists", JSON.stringify(updatedLists));
      }
    };

    const interval = setInterval(check, NOTIFICATION_POLL_INTERVAL_MS);
    const initialDelay = setTimeout(check, 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(initialDelay);
    };
  }, [settings?.isDueDateNotificationsOn, settings?.defaultAlertBefore, settings?.useBrowserNotifications, setTaskLists]);
};

export default useTaskDueNotifications;
