import { useState, useEffect } from 'react';
import TaskPanel from './components/TaskPanel/TaskPanel';
import Timer from './components/Timer/Timer';
import { ReactComponent as GemIcon } from './components/assets/gemIcon.svg';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/components/Sidebar/Sidebar';
import { ApplyBodyStyles } from './utils';
import Dropdown from './components/Dropdown/Dropdown';
import SideBarListWrapper from './components/Sidebar/components/SidebarList/SidebarList';
import useTasks from './hooks/useTasks';
import { SettingsProps, Settings, getParsedSettings } from './components/Setting/index';
const SETTINGS_KEY = 'appSettings';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [askedForTask, setAskedForTask] = useState<string>("");

  const [count, setCount] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(300);
  const [isAlertOn, setIsAlertOn] = useState<boolean>(false);
  const [isAutoSwitchOn, setAutoSwitchOn] = useState<boolean>(true);
  const [isNewTaskOnTop, setIsNewTaskOnTop] = useState<boolean>(false);
  const [alarmName, setAlarmName] = useState<string>('');
  const [bgImg, setBgImg] = useState<string>('');
  const [theme, setTheme] = useState('default');

  const [isSidebarListOpen, setSidebarListOpen] = useState(false);
  const { tasks, setTasks, handleDeleteAll, openTask, setOpenTask, isMassDelete, currentTask, setCurrentTask } = useTasks();


  useEffect(() => {
    const settings: SettingsProps | null = getParsedSettings(SETTINGS_KEY);

    if (settings) {
        setCount(settings.count);
        setBreakDuration(settings.breakDuration);
        setIsAlertOn(settings.isAlertOn);
        setAutoSwitchOn(settings.isAutoSwitchOn);
        setIsNewTaskOnTop(settings.isNewTaskOnTop);
        setTheme(settings.theme);
        setBgImg(settings.bgImg);
        setAlarmName(settings.alarmSoundName);
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
              <Dropdown setSidebarListOpen={setSidebarListOpen} setModalOpen={setModalOpen} />
            </div>
            <Timer
              count={count}
              breakDuration={breakDuration}
              setCount={setCount}
              setBreakDuration={setBreakDuration}
              isAutoSwitchOn={isAutoSwitchOn}
              handleDeleteAll={handleDeleteAll}
              isAlertOn={isAlertOn} />
            <TaskPanel
              isNewTaskOnTop={isNewTaskOnTop}
              isMassDelete={isMassDelete}
              handleDeleteAll={handleDeleteAll}
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
              openTask={openTask}
              setOpenTask={setOpenTask}
              tasks={tasks}
              setTasks={setTasks}
              setAskedForTask={setAskedForTask}
              onClick={toggleSidebar} />
          </div>
        </div>
      </div>
      <SideBarListWrapper
        setSidebarListOpen={setSidebarListOpen}
        isSidebarListOpen={isSidebarListOpen} />
      <Sidebar
        taskDescription={askedForTask}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default App;