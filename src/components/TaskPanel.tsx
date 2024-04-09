import React, { useState, useEffect } from 'react';
import styles from './TaskPanel.module.css';

interface Task {
    id: number;
    text: string;
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
            setTasks([...tasks, { id: Date.now(), text: task }]);
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
                        {editId === task.id ? (
                            <input
                                type="text"
                                value={editText}
                                onChange={handleEditChange}
                                className={styles.editInput}
                            />
                        ) : (
                            <span>{task.text}</span>
                        )}
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
