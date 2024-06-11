import { Task, TaskListProps } from "@components/Sidebar";

interface TaskTitleProps {
  currentSelectedTaskList: TaskListProps | null;
  handleDeleteAll: (removeTask: boolean, massDelete: boolean) => void;
  tasks: Task[];
}

interface TaskPanelProps {
  saveEdit: (id: number, newText: string) => void;
  setAsFavorite: (id: number) => void;
  toggleTaskCompletion: (id: number) => void;
  toggleSidebar: (task: Task | null) => void;
  moveTaskToList: (taskId: number, newListId: number) => void;
  taskLists: TaskListProps[];
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
  saveEdit: (id: number, newText: string) => void;
}

export type { TaskTitleProps, TaskPanelProps, TaskComponentProps };
