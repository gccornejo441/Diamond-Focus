import React, { useState, useEffect } from 'react';
import styles from './TaskPanel.module.css';
import { Menu, Item, useContextMenu, RightSlot } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import { ReactComponent as TaskButton } from './assets/taskButton.svg';

const svgStyle = {
    width: '20px',
    height: '20px',
    fill: 'currentColor'
};

const MENU_ID = 'task-context-menu';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const TaskPanel = () => {
    const { show } = useContextMenu({ id: MENU_ID });
    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [editId, setEditId] = useState<number | null>(null);
    const [editText, setEditText] = useState('');

    const handleContextMenu = (event: React.MouseEvent, task: Task) => {
        event.preventDefault();
        setCurrentTask(task);
        show({
            id: MENU_ID,
            event: event,
            props: {
                task
            }
        });
    };

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (task.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
            setTask('');
        }
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const startEdit = (task: Task | null) => {
        setEditId(task!.id);
        setEditText(task!.text);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value);
    };

    const saveEdit = (id: number) => {
        const updatedTasks = tasks.map(t => t.id === id ? { ...t, text: editText } : t);
        setTasks(updatedTasks);
        setEditId(null);
        setEditText('');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            editId ? saveEdit(editId) : addTask();
        }
    };

    const toggleTaskCompletion = (id: number): void => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    const handleTaskDeleteShortcut = (event: KeyboardEvent): boolean => {
        return event.ctrlKey && event.key === 'd';
    }

    return (
        <div className={styles.taskPanel}>
            
            <ul className={styles.taskList}>
                {tasks.map(task => (
                    <li key={task.id} className={styles.taskItem} onContextMenu={(e) => handleContextMenu(e, task)}>
                        <div className={styles.checkboxwrapper15}>
                            <input className={styles.inpCbx}
                                id={`cbx-${task.id}`}
                                type="checkbox"
                                style={{ display: 'none' }}
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id)} />
                            <label 
                            className={styles.cbx} 
                            htmlFor={`cbx-${task.id}`}>
                                <span>
                                    <svg width="12px" height="9px" viewBox="0 0 12 9">
                                        <polyline points="1 5 4 8 11 1"></polyline>
                                    </svg>
                                </span>
                        </label>
                                <p id={`text-${task.id}`} // Ensure unique IDs for each task text
                            className={`${styles.taskText} ${task.completed ? styles.strikethrough : ''}`}>
                            {task.text}
                        </p>                            
                        </div>
                    </li>
                ))}
            </ul>

            <div className={styles.inputArea}>
                <input
                    type="text"
                    placeholder={editId ? "Edit task" : "Add a task"}
                    value={editId ? editText : task}
                    onChange={editId ? handleEditChange : (e) => setTask(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={styles.input}
                />
                <button
                    onClick={editId ? () => saveEdit(editId) : addTask}
                    className={styles.button}>
                    {editId ? "Save" : <TaskButton style={svgStyle} />}
                </button>
            </div>
            
            <Menu id={MENU_ID}>
                <Item
                    className={styles.editItem}
                    onClick={() => startEdit(currentTask)}>Edit</Item>
                <Item
                    className={styles.deleteItem}
                    keyMatcher={handleTaskDeleteShortcut}
                    onClick={() => currentTask && deleteTask(currentTask.id)}>Delete<RightSlot>CTRL + D</RightSlot></Item>
            </Menu>
        </div>
    );
}

export default TaskPanel;






