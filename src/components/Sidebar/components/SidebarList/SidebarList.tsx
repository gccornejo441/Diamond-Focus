import React, { useState } from 'react';
import { ReactComponent as ToggleIcon } from '../../../assets/toggleIcon.svg';
import { initialTaskLists } from '../../../../utils';
import styles from './SidebarList.module.css';
import { TaskListProps, SidebarProps } from '../../types/SidebarTypes';
import SidebarTaskList from './SidebarListTask';

const SideBarListWrapper = ({ isSidebarListOpen, setSidebarListOpen }: SidebarProps) => {
    const [taskLists, setTaskLists] = useState<TaskListProps[]>(initialTaskLists);

    const addTaskList = () => {
        const newTaskList = {
            id: taskLists.length,
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
    };

    const handleTaskListDelete = (id: number) => {
        const updatedTaskLists = taskLists.filter(list => list.id !== id);
        localStorage.setItem('taskLists', JSON.stringify(updatedTaskLists));
        setTaskLists(updatedTaskLists);
    };

    return (
        <div>
            <div className={isSidebarListOpen ? `${styles.sidebar} ${styles.open}` : styles.sidebar}>
                <div className={styles.toggleButton} onClick={() => setSidebarListOpen(!isSidebarListOpen)}>
                    <ToggleIcon className={styles.toggleIcon} aria-label="Toggle Icon" />
                </div>
                <button onClick={addTaskList} className={styles.addButton}>Add List</button>
                {taskLists.map(list => (
                    <SidebarTaskList
                        key={list.id}
                        id={list.id}
                        value={list.title}
                        onTitleChange={handleTitleChange}
                        onDelete={handleTaskListDelete} // Pass the delete handler
                    />
                ))}
            </div>
            {isSidebarListOpen && <div className={styles.overlay} onClick={() => setSidebarListOpen(false)}></div>}
        </div>
    );
}

export default SideBarListWrapper;
