import "react-contexify/dist/ReactContexify.css";
import styles from "../styles/TaskPanel.module.css";
import DeleteModal from "@components/DeleteModal";
import { Popup } from "@components/Popup";
import { Menu, Item, useContextMenu, Submenu } from "react-contexify";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverEvent,
  UniqueIdentifier,
  MouseSensor,
} from "@dnd-kit/core";
import { TaskPanelProps } from "../types/TaskTypes";
import TaskTitle from "./TaskTitle";
import { Task } from "@components/Sidebar";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const MENU_ID = "task-context-menu";

const TaskPanel = ({
  toggleTaskCompletion,
  setAsFavorite,
  taskLists,
  isNewTaskOnTop,
  isMassDelete,
  handleDeleteAll,
  currentTask,
  setCurrentTask,
  toggleSidebar,
  tasks,
  setTasks,
  openTask,
  setOpenTask,
  currentSelectedTaskList,
  moveTaskToList,
}: TaskPanelProps) => {
  const { show } = useContextMenu({ id: MENU_ID });

  const handleDoubleClick = (event: React.MouseEvent, task: Task) => {
    event.preventDefault();
    setCurrentTask(task);
    show({
      id: MENU_ID,
      event: event as unknown as MouseEvent,
      props: {
        task,
      },
    });
  };
  const saveEdit = (id: number, newText: string) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, text: newText } : t
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
        delay: 500,
        tolerance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  );

  const getCurrentTaskPosition = (id: UniqueIdentifier | undefined) =>
    tasks.findIndex((task) => task.id === id);

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
    <DndContext
      sensors={sensors}
      onDragEnd={handleOnDragEnd}
      collisionDetection={closestCorners}
    >
      <Popup onClose={() => setOpenTask(false)} isOpen={openTask}>
        <DeleteModal
          isMassDelete={isMassDelete}
          handleDelete={() => handleDeleteAll(true, isMassDelete)}
          handleCancel={() => setOpenTask(false)}
          item={currentTask?.text || "unknown"}
        />
      </Popup>
      <div className={styles.taskPanel}>
        <TaskTitle
          tasks={tasks}
          handleDeleteAll={handleDeleteAll}
          currentSelectedTaskList={currentSelectedTaskList}
        />
        <TaskInput
          tasks={tasks}
          setTasks={setTasks}
          isNewTaskOnTop={isNewTaskOnTop}
        />
        <TaskList
          tasks={tasks}
          toggleTaskCompletion={toggleTaskCompletion}
          handleDoubleClick={handleDoubleClick}
          saveEdit={saveEdit}
        />
        <Menu className={styles.contextMenuButton} id={MENU_ID}>
          <Item onClick={() => toggleSidebar(currentTask)}>View</Item>
          <Submenu label="Move to">
            {taskLists
              .filter((taskList) => taskList.id !== currentSelectedTaskList?.id)
              .map((taskList) => (
                <Item
                  key={taskList.id}
                  onClick={() => moveTaskToList(currentTask!.id, taskList.id)}
                >
                  {taskList.title}
                </Item>
              ))}
          </Submenu>
          <Item
            onClick={() => currentTask && toggleTaskCompletion(currentTask.id)}
          >
            Set as {currentTask?.completed ? "active" : "completed"}
          </Item>
          <Item onClick={() => currentTask && setAsFavorite(currentTask.id)}>
            Set as important
          </Item>
          <Item onClick={() => handleDeleteAll(false, false)}>Delete</Item>
        </Menu>
      </div>
    </DndContext>
  );
};

export default TaskPanel;
