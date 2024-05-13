import React, { useState } from 'react';
import styles from '../SidebarList/SidebarList.module.css';
import { ReactComponent as ToggleIcon } from '../../assets/toggleIcon.svg';
import { Task } from '../../TaskPanel/TaskPanel';
import TaskList from './SidebarTaskList';

interface SidebarListProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export interface TasklistProp {
    id: number;
    title: string;
    tasks: Task[];
}

const SidebarList = ({ isOpen, toggleSidebar }: SidebarListProps) => {
    const initialTaskLists = () => {
        const storedTaskLists = localStorage.getItem('taskLists');
        if (storedTaskLists) {
            return JSON.parse(storedTaskLists);
        }
        return [{
            id: 0,
            title: 'New List',
            tasks: [
                { id: 0, text: 'New Task', completed: false, favorite: false, createdAt: new Date() }, 
            ] 
        }];
    };

    const [taskLists, setTaskLists] = useState<TasklistProp[]>(initialTaskLists);

    const addTaskList = () => {
        const newTaskList = {
            id: taskLists.length, // Adjust ID calculation if needed
            title: 'New List',
            tasks: [{ id: 0, text: 'New Task', completed: false, favorite: false, createdAt: new Date() }],
        };
        const updatedTaskLists = [...taskLists, newTaskList];
        localStorage.setItem('taskLists', JSON.stringify(updatedTaskLists));
        setTaskLists(updatedTaskLists);
    };

    const handleTitleChange = (id: number, newTitle: string) => {
        const updatedTaskLists = taskLists.map(list => {
            if (list.id === id) {
                return { ...list, title: newTitle };
            }
            return list;
        });
        localStorage.setItem('taskLists', JSON.stringify(updatedTaskLists));
        setTaskLists(updatedTaskLists);
    }

    return (
        <div className={isOpen ? `${styles.sidebar} ${styles.open}` : styles.sidebar}>
            <div className={styles.toggleButton} onClick={toggleSidebar}>
                <ToggleIcon className={styles.toggleIcon} aria-label="Toggle Icon" />
            </div>
            <button onClick={addTaskList} className={styles.addButton}>Add List</button>
            {taskLists.map(list => (
                <TaskList key={list.id} id={list.id} value={list.title} onTitleChange={handleTitleChange} />
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
