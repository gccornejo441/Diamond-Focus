import React, { useState, useEffect } from 'react';
import styles from '../TaskPanel/TaskPanel.module.css';
import { Menu, Item, useContextMenu, RightSlot } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import { ReactComponent as TaskButton } from '../assets/taskIcon.svg';
import { ReactComponent as SaveButton } from '../assets/saveIcon.svg';
import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors, closestCorners, DragOverEvent, UniqueIdentifier, MouseSensor } from '@dnd-kit/core';
import TaskItem from './TaskItem';
import DeleteModal from '../DeleteModal';
import Popup from '../Popup/Popup';

const svgStyle = {
    cursor: 'pointer',
    fill: 'white',
    width: '20px',
    height: '20px',
    transition: 'fill 0.2s',
}
const MENU_ID = 'task-context-menu';

export interface Task {
    id: number;
    text: string;
    completed: boolean;
    favorite: boolean;
    createdAt: Date;
}

interface TaskPanelProps {
    setAskedForTask: React.Dispatch<React.SetStateAction<string>>;
    onClick: () => void;
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    openTask: boolean;
    setOpenTask: React.Dispatch<React.SetStateAction<boolean>>
    setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>;
    currentTask: Task | null;
    handleDeleteAll: (removeTask: boolean, massDelete: boolean) => void;
    isMassDelete: boolean;
}

const TaskPanel = 
({ isMassDelete, handleDeleteAll,currentTask, setCurrentTask, onClick, setAskedForTask, tasks, setTasks, openTask, setOpenTask }: TaskPanelProps) => {
    const { show } = useContextMenu({ id: MENU_ID });
    const [task, setTask] = useState<string>('');
    const [editId, setEditId] = useState<number | null>(null);
    const [editText, setEditText] = useState('');

    const handleDoubleClick = (event: React.MouseEvent, task: Task) => {
        event.preventDefault();
        setCurrentTask(task);
        show({
            id: MENU_ID,
            event: event as unknown as MouseEvent,
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
            setTasks([...tasks, { id: Date.now(), text: task, completed: false, favorite: false, createdAt: new Date() }]);
            setTask('');
        }
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
        if (event.key === 'Enter' && (editId ? editText.trim() !== '' : task.trim() !== '')) {
            editId ? saveEdit(editId) : addTask();
        }
    };

    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const handleClickOnTask = (task: Task | null) => {
        onClick();
        setAskedForTask(task!.text);
    }

    const setAsFavorite = (id: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, favorite: !task.favorite } : task
        );
        setTasks(updatedTasks);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
          }),        
          useSensor(TouchSensor, {
            activationConstraint: {
                delay: 300,
                tolerance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
        ,
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const getCurrentTaskPosition = (id: UniqueIdentifier | undefined) => tasks.findIndex((task) => task.id === id);

    const handleOnDragEnd = (event: DragOverEvent) => {
        const { active, over } = event;

        if (active.id === over?.id) return;

        setTasks((tasks) => {
            const firstPosition = getCurrentTaskPosition(active.id);
            const newPosition = getCurrentTaskPosition(over?.id);

            return arrayMove(tasks, firstPosition, newPosition);
        });
    };

    return (
        <DndContext onDragEnd={handleOnDragEnd} sensors={sensors} collisionDetection={closestCorners}>
            <Popup onClose={() => setOpenTask(false)} isOpen={openTask} >
                <DeleteModal
                    isMassDelete={isMassDelete}
                    handleDelete={() => handleDeleteAll(true, isMassDelete)}
                    handleCancel={() => setOpenTask(false)}
                    item={currentTask?.text || 'unknown'} />
            </Popup>
            <div className={styles.taskPanel}>
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
                        className={editId ? styles.button : styles.button}
                        disabled={editId ? editText.trim() === '' : task.trim() === ''}>
                        {editId ? <SaveButton style={svgStyle} /> : <TaskButton style={svgStyle} />}
                    </button>
                </div>
                <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                    <ul className={styles.taskList}>
                        {tasks.map(task => (
                            <TaskItem key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion} handleDoubleClick={handleDoubleClick} />
                        ))}
                    </ul>
                </SortableContext>
                <Menu id={MENU_ID}>
                    <Item className={styles.contextMenuButton}
                        onClick={() => handleClickOnTask(currentTask)}>View</Item>
                    <Item
                        className={styles.contextMenuButton}
                        onClick={() => startEdit(currentTask)}>Edit</Item>
                    <Item className={styles.contextMenuButton}
                        onClick={() => currentTask && toggleTaskCompletion(currentTask.id)}>Set as {currentTask?.completed ? 'active' : 'completed'}</Item>
                    <Item className={styles.contextMenuButton} onClick={() => currentTask && setAsFavorite(currentTask.id)}>Set as important<RightSlot>⭐</RightSlot></Item>
                    <Item
                        className={styles.contextMenuButton}
                        onClick={() => handleDeleteAll(false, false)}>Delete<RightSlot>CTRL + D</RightSlot></Item>
                </Menu>
            </div>
        </DndContext>
    );
}

export default TaskPanel;