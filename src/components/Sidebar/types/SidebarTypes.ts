import React from "react";

export interface SidebarListProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  favorite: boolean;
  createdAt: Date;
}

export interface TaskListProps {
  id: number;
  title: string;
  tasks: Task[];
}

export interface CurrentSelectedTaskProps extends SidebarListStateProps {
  currentSelectedTaskList: number;
}

export interface SidebarListStateProps {
  isSidebarListOpen: boolean;
  setSidebarListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentSelectedTaskList: React.Dispatch<React.SetStateAction<number>>;
}

export interface TaskListTitleProps {
  id: number;
  value: string;
  onTitleChange: (id: number, newTitle: string) => void;
}
