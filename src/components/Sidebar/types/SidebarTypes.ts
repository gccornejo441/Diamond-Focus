import React from "react";

interface SidebarListProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

type RecurrencePattern = "none" | "daily" | "weekly" | "monthly";

interface ReminderConfig {
  enabled: boolean;
  alertBefore: number;
  recurrence: RecurrencePattern;
  lastNotifiedAt?: string | null;
}

interface Task {
  id: number;
  text: string;
  completed: boolean;
  favorite: boolean;
  createdAt: Date;
  dueDate?: string | null;
  reminder?: ReminderConfig | null;
}

interface TaskListProps {
  id: number;
  title: string;
  taskSelected: boolean;
  tasks: Task[];
}

interface useSidebarHookProps {
  setTaskLists: React.Dispatch<React.SetStateAction<TaskListProps[]>>;
  taskLists: TaskListProps[];
}

interface SidebarListStateProps extends useSidebarHookProps {
  isSidebarListOpen: boolean;
  setSidebarListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentSelectedTaskList: React.Dispatch<
    React.SetStateAction<TaskListProps | null>
  >;
}

interface TaskListTitleProps {
  id: number;
  value: string;
  onTitleChange: (id: number, newTitle: string) => void;
}

export type {
  useSidebarHookProps,
  SidebarListProps,
  TaskListProps,
  TaskListTitleProps,
  SidebarListStateProps,
  Task,
  ReminderConfig,
  RecurrencePattern,
};
