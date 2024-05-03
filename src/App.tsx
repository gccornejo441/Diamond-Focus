import { useState, useEffect } from 'react';
import TaskPanel, { Task } from './components/TaskPanel/TaskPanel';
import Timer from './components/Timer/Timer';
import { ReactComponent as GemIcon } from './components/assets/gemIcon.svg';
import { ReactComponent as SettingButton } from './components/assets/settingButton.svg';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';
import { ApplyBodyStyles } from './utils';

function App() {
  const [openTask, setOpenTask] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [askedForTask, setAskedForTask] = useState<string>("");
  const [isAlertOn, setIsAlertOn] = useState<boolean>(true);
  const [isAutoSwitchOn, setAutoSwitchOn] = useState<boolean>(true);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isMassDelete, setIsMassDelete] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    const savedBgImg = localStorage.getItem('bgImg') || '';
    ApplyBodyStyles(savedBgImg, savedTheme);
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleDeleteAll = (removeTask: boolean, massDelete: boolean) => {
    setIsMassDelete(massDelete)

    if (massDelete) {
      setOpenTask(true);
      if (removeTask) {
        localStorage.removeItem('tasks');
        setTasks([]);
        setOpenTask(false);
        setIsMassDelete(false);
      }

    } else {
      setOpenTask(true);
      if (removeTask && currentTask && currentTask.id) {
        deleteTask(currentTask.id);
        setOpenTask(false);
        setIsMassDelete(false);
      }
    }
  }

  return (
    <div className={styles.App}>
      <div className={styles.container}></div>
        <div className={styles.innerContainer}>
          <div className={styles.settingButtonPanel}>
            <div className={styles.settingHeaderContainer}>
              <h1>
                <a href="/" className={styles.title}>
                  <GemIcon aria-label="Gem Icon" className={styles.icon} />
                </a>
              </h1>
              <button onClick={() => setModalOpen(true)} className="controlButton">
                <SettingButton style={{ width: '20px', height: '20px' }} aria-label="Setting Button" />
              </button>
            </div>
          </div>
          <div className={styles.bodyContainer}>
            <div className={styles.bodyInnerContainer}>
              <Timer isAutoSwitchOn={isAutoSwitchOn} setAutoSwitchOn={setAutoSwitchOn} handleDeleteAll={handleDeleteAll} setIsAlertOn={setIsAlertOn} isAlertOn={isAlertOn} isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
              <TaskPanel isMassDelete={isMassDelete} handleDeleteAll={handleDeleteAll} currentTask={currentTask} setCurrentTask={setCurrentTask} openTask={openTask} setOpenTask={setOpenTask} tasks={tasks} setTasks={setTasks} setAskedForTask={setAskedForTask} onClick={toggleSidebar} />
            </div>
          </div>
        </div>
      <Sidebar
        taskDescription={askedForTask}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar} />
      {/* <Foo/> */}
    </div>
  );
}

export default App;