import React, { useState, useEffect } from 'react';
import styles from './TaskPanel.module.css';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const TaskPanel = () => {
    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [editId, setEditId] = useState<number | null>(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (task !== '') {
            setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
            setTask('');
        }
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const startEdit = (task: Task) => {
        setEditId(task.id);
        setEditText(task.text);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value);
    };

    const saveEdit = (id: number) => {
        const updatedTasks = tasks.map(task => task.id === id ? { ...task, text: editText } : task);
        setTasks(updatedTasks);
        setEditId(null);
        setEditText('');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (editId) {
                saveEdit(editId);
            } else {
                addTask();
            }
        }
    };

    const toggleTaskCompletion = (id: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div className={styles.container}>
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
                    {editId ? "Save" : "Add Task"}
                </button>
            </div>
            <ul className={styles.taskList}>
                {tasks.map((task) => (
                    <li key={task.id} className={styles.taskItem}>
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
                                <span>{task.text}</span>
                            </label>
                        </div>
                        <div>
                            <button onClick={() => startEdit(task)} className={styles.editButton}>Edit</button>
                            <button onClick={() => deleteTask(task.id)} className={styles.deleteButton}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default TaskPanel;
