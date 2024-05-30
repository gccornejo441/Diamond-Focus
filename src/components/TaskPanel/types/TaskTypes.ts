import { Task, TaskListProps } from "@components/Sidebar";

interface TaskTitleProps {
  currentSelectedTaskList: TaskListProps | null;
  handleDeleteAll: (removeTask: boolean, massDelete: boolean) => void;
}

interface TaskPanelProps {
  setAskedForTask: React.Dispatch<React.SetStateAction<string>>;
  onClick: () => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  openTask: boolean;
  setOpenTask: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>;
  currentTask: Task | null;
  handleDeleteAll: (removeTask: boolean, massDelete: boolean) => void;
  isMassDelete: boolean;
  isNewTaskOnTop: boolean;
  currentSelectedTaskList: TaskListProps | null;
}

interface TaskComponentProps {
  task: Task;
  toggleTaskCompletion: (id: number) => void;
  handleDoubleClick: (e: React.MouseEvent, task: Task) => void;
}

export type { TaskTitleProps, TaskPanelProps, TaskComponentProps };
