import { useEffect, useRef, useState } from 'react';
import styles from './SidebarList.module.css';

interface TaskListProps {
    id: number;
    value: string;
    onTitleChange: (id: number, newTitle: string) => void;
}

const DynamicTextInput = ({ id, value, onTitleChange }: TaskListProps) => {
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
        onTitleChange(id, inputValue); // Include id when calling onTitleChange
        setEditing(false);
    };


    return (
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
    )
}


const TaskList = ({ id, value, onTitleChange }: TaskListProps) => {
    return (
        <div className={styles.taskList}>
            <DynamicTextInput id={id} value={value} onTitleChange={onTitleChange} />
        </div>
    );
}
export default TaskList;
