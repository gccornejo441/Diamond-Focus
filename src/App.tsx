import { useState, useEffect } from 'react';
import TaskPanel, { Task } from './components/TaskPanel/TaskPanel';
import Timer from './components/Timer/Timer';
import { ReactComponent as GemIcon } from './components/assets/gemIcon.svg';
import { ReactComponent as SettingButton } from './components/assets/settingIcon.svg';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';
import { ApplyBodyStyles } from './utils';
import Settings from './components/Setting/Setting';

function App() {
  const [openTask, setOpenTask] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [askedForTask, setAskedForTask] = useState<string>("");
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isMassDelete, setIsMassDelete] = useState<boolean>(false);

  const [count, setCount] = useState(0);
  const [breakDuration, setBreakDuration] = useState(0);
  const [isAlertOn, setIsAlertOn] = useState<boolean>(false);
  const [isAutoSwitchOn, setAutoSwitchOn] = useState<boolean>(true);
  const [isNewTaskOnTop, setIsNewTaskOnTop] = useState<boolean>(false);
  const [alarmName, setAlarmName] = useState<string>('');
  const [bgImg, setBgImg] = useState<string>('');
  const [theme, setTheme] = useState('default');

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  useEffect(() => {
    const settings = localStorage.getItem('settingsSaved');
    if (settings) {

      const savedSettings = JSON.parse(settings);
      setCount(savedSettings.count ? parseInt(savedSettings.count) : 1500);
      setBreakDuration(savedSettings.breakDuration ? parseInt(savedSettings.breakDuration) : 300);
      setIsAlertOn(savedSettings.isAlertOn ?? false);
      setAutoSwitchOn(savedSettings.isAutoSwitchOn ?? false);
      setIsNewTaskOnTop(savedSettings.isNewTaskOnTop ?? false);
      setTheme(savedSettings.theme || '');
      setBgImg(savedSettings.bgImg || '');
    }

    setTimeout(() => setIsLoading(false), 100);
  }, []);

  useEffect(() => {
    ApplyBodyStyles(bgImg, theme);
  }, [bgImg, theme]);

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
      {isModalOpen && (
        <Settings
          alarmName={alarmName}
          setAlarmName={setAlarmName}
          theme={theme}
          setTheme={setTheme}
          bgImg={bgImg}
          setBgImg={setBgImg}
          isNewTaskOnTop={isNewTaskOnTop}
          setIsNewTaskOnTop={setIsNewTaskOnTop}
          isAutoSwitchOn={isAutoSwitchOn}
          setAutoSwitchOn={setAutoSwitchOn}
          isAlertOn={isAlertOn}
          setIsAlertOn={setIsAlertOn}
          breakDuration={breakDuration}
          setBreakDuration={setBreakDuration}
          count={count}
          setCount={setCount}
          onClose={() => setModalOpen(false)} />
      )}
      <div className={styles.innerContainer}>
        <div className={styles.bodyContainer}>
          <div className={styles.bodyInnerContainer}>
            <div className={styles.settingHeaderContainer}>
              <a href="/" className={styles.title}>
                <GemIcon aria-label="Gem Icon" className={styles.icon} />
              </a>
              <button onClick={() => setModalOpen(true)} className="controlButton">
                <SettingButton style={{ width: '20px', height: '20px' }} aria-label="Setting Button" />
              </button>
            </div>
            <Timer
              count={count}
              breakDuration={breakDuration}
              setCount={setCount}
              setBreakDuration={setBreakDuration}
              isAutoSwitchOn={isAutoSwitchOn}
              handleDeleteAll={handleDeleteAll}
              isAlertOn={isAlertOn} />
            <TaskPanel isNewTaskOnTop={isNewTaskOnTop} isMassDelete={isMassDelete} handleDeleteAll={handleDeleteAll} currentTask={currentTask} setCurrentTask={setCurrentTask} openTask={openTask} setOpenTask={setOpenTask} tasks={tasks} setTasks={setTasks} setAskedForTask={setAskedForTask} onClick={toggleSidebar} />
          </div>
        </div>
      </div>
      <Sidebar
        taskDescription={askedForTask}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default App;