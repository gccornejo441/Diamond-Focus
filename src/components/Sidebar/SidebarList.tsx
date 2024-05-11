import React, { useState } from 'react';
import styles from './SidebarList.module.css';
import { ReactComponent as ToggleIcon } from '../assets/toggleIcon.svg';
interface TaskList {
    id: number;
    title: string;
}

interface TaskListProps {
    title: string;
}

const TaskList: React.FC<TaskListProps> = ({ title }) => {
    return (
        <div className={styles.taskList}>
            {title}
        </div>
    );
}


interface SidebarListProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const SidebarList = ({ isOpen, toggleSidebar }: SidebarListProps) => {
    const [taskLists, setTaskLists] = React.useState<TaskList[]>([{ id: 0, title: 'My Day' }]);

    const addTaskList = () => {
        const newTaskList = {
            id: taskLists.length,
            title: 'New List'
        };
        setTaskLists([...taskLists, newTaskList]);
    };


    return (
        <div className={isOpen ? `${styles.sidebar} ${styles.open}` : styles.sidebar}>
            <div className={styles.toggleButton} onClick={toggleSidebar}>
                {isOpen ? 
                <ToggleIcon className={styles.toggleIcon} aria-label="Toggle Icon" /> : 
                <ToggleIcon className={styles.toggleIcon} aria-label="Toggle Icon" />}
            </div>
            <button onClick={addTaskList} className={styles.addButton}>Add List</button>
            {taskLists.map(list => (
                <TaskList key={list.id} title={list.title} />
            ))}
        </div>

    );
}


interface SidebarProps {
    isSidebarListOpen: boolean;
    setSidebarListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarListWrapper = ({isSidebarListOpen, setSidebarListOpen }: SidebarProps) => {
    return (
        <div>
            <SidebarList isOpen={isSidebarListOpen} toggleSidebar={() => setSidebarListOpen(!isSidebarListOpen)} />
            {isSidebarListOpen && <div className={styles.overlay} onClick={() => setSidebarListOpen(false)}></div>}
        </div>
    );
}

export default SideBarListWrapper;
