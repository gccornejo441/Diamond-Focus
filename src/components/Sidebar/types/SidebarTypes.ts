import React from "react";

interface SidebarListProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface Task {
  id: number;
  text: string;
  completed: boolean;
  favorite: boolean;
  createdAt: Date;
}

interface TaskListProps {
  id: number;
  title: string;
  tasks: Task[];
}

interface SidebarListStateProps {
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
  SidebarListProps,
  TaskListProps,
  TaskListTitleProps,
  SidebarListStateProps,
  Task,
};
