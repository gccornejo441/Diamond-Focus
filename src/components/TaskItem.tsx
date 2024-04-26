import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './TaskPanel.module.css';
import { Task } from './TaskPanel';

interface TaskComponentProps {
    task: Task;
    toggleTaskCompletion: (id: number) => void;
    handleDoubleClick: (e: React.MouseEvent, task: Task) => void;
}

const TaskItem = ({ task, toggleTaskCompletion, handleDoubleClick }: TaskComponentProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        touchAction: 'none',
    };

    return (
        <li key={task.id}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`${styles.taskItem} ${task.favorite ? styles.favoriteTask : ''}`}
            onContextMenu={(e) => handleDoubleClick(e, task)}
            onDoubleClick={(e) => handleDoubleClick(e, task)}>
            <div className={styles.checkboxwrapper15}>
                <input className={styles.inpCbx}
                    id={`cbx-${task.id}`}
                    type="checkbox"
                    style={{ display: 'none' }}
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)} />
                <label className={styles.cbx} htmlFor={`cbx-${task.id}`}>
                    <span>
                        <svg width="12px" height="9px" viewBox="0 0 12 9">
                            <polyline points="1 5 4 8 11 1"></polyline>
                        </svg>
                    </span>
                </label>
                <p id={`text-${task.id}`}
                    className={`${styles.taskText} ${task.completed ? styles.strikethrough : ''}`}>
                    {task.text}
                </p>
            </div>
        </li>
    );
};

export default TaskItem