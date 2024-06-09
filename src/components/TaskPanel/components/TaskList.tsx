import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";
import { Task } from "@components/Sidebar";
import styles from "../styles/TaskList.module.css";

interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (id: number) => void;
  handleDoubleClick: (event: React.MouseEvent, task: Task) => void;
  saveEdit: (id: number, newText: string) => void;
}

const TaskList = ({
  tasks,
  toggleTaskCompletion,
  handleDoubleClick,
  saveEdit,
}: TaskListProps) => {
  return (
    <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
            handleDoubleClick={handleDoubleClick}
            saveEdit={saveEdit}
          />
        ))}
      </ul>
    </SortableContext>
  );
};

export default TaskList;
