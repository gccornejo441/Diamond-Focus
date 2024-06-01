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
};
