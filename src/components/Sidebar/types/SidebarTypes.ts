import React from "react";

export interface SidebarListProps {
    setCurrentTaskList: React.Dispatch<React.SetStateAction<TaskListProp>>
    isOpen: boolean;
    toggleSidebar: () => void;
    currentTaskList: TaskListProp;
}

export interface Task {
    id: number;
    text: string;
    completed: boolean;
    favorite: boolean;
    createdAt: Date;
}

export interface TaskListProp {
    id: number;
    title: string;
    tasks: Task[];
}

export interface SidebarProps {
    currentTaskList: TaskListProp;
    isSidebarListOpen: boolean;
    setSidebarListOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentTaskList: React.Dispatch<React.SetStateAction<TaskListProp>>;
}
