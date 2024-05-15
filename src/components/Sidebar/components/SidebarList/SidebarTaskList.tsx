import React, { useEffect, useRef, useState } from 'react';
import { TaskListTitleProps } from '../../types/SidebarTypes';
import styles from './SidebarList.module.css';

const SidebarTaskList = ({ id, value, onTitleChange }: TaskListTitleProps) => {
    const [isEditing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleTextClick = () => {
        setEditing(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleInputBlur = () => {
        onTitleChange(id, inputValue);
        setEditing(false);
    };

    return (
        <div className={styles.taskList}>
            <div className={styles.editableText}>
                {isEditing ? (
                    <input
                        ref={inputRef}
                        className={styles.input}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                    />
                ) : (
                    <div onDoubleClick={handleTextClick} className={styles.text}>
                        {value}
                    </div>
                )}
            </div>
        </div>
    );
};
export default SidebarTaskList;
