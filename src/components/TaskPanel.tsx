import React, { useState, useEffect } from 'react';
import styles from './TaskPanel.module.css';

const TaskPanel = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState<string[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (task !== '') {
            setTasks([...tasks, task]);
            setTask('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            addTask();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputArea}>
                <input 
                    type="text" 
                    placeholder="Add a task" 
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={styles.input}
                />
                <button onClick={addTask} className={styles.button}>Add Task</button>
            </div>
            <ul className={styles.taskList}>
                {tasks.map((task, index) => (
                    <li key={index} className={styles.taskItem}>{task}</li>
                ))}
            </ul>
        </div>
    );
}

export default TaskPanel;
