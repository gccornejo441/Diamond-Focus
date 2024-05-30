import styles from "../styles/TaskTitle.module.css";
import { TaskTitleProps } from "..";
import Dropdown from "@components/Dropdown/Dropdown";
import { useMemo } from "react";

const TaskTitle = ({
  currentSelectedTaskList,
  handleDeleteAll,
}: TaskTitleProps) => {
  const stateHandlers = useMemo(
    () => ({
      "Delete All Tasks": () => handleDeleteAll(false, true),
    }),
    [],
  );

  const names = useMemo(() => [{ name: "Delete All Tasks" }], []);

  return (
    <div className={styles.taskTitleWrapper}>
      <div className={styles.taskTitleInner}>
        <div className={styles.taskTitleCount}>
          <Dropdown
            className={styles.taskTitle}
            names={names}
            stateHandlers={stateHandlers}
          >
            <span>{currentSelectedTaskList?.title}</span>
          </Dropdown>
          <span className={styles.taskCount}>
            {currentSelectedTaskList?.tasks.length} Tasks
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskTitle;
