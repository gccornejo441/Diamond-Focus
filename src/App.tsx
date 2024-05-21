import { useState, useEffect } from "react";
import TaskPanel from "./components/TaskPanel/TaskPanel";
import Timer from "./components/Timer/Timer";
import styles from "./App.module.css";
import Sidebar from "./components/Sidebar/components/Sidebar/Sidebar";
import { ApplyBodyStyles } from "./utilities/helpers";
import { SidebarList } from "@components/Sidebar/index";
import Dropdown from "./components/Dropdown/Dropdown";
import useTasks from "@hooks/useTasks";
import SettingButton from "@assets/settingIcon.svg?react";
import GemLogo from "@assets/gemIcon.svg?react";
import { getParsedSettings, SettingsProps } from "@components/Setting/export";
import { Settings } from "@components/Setting/";
import ProgressBar from "@components/ProgressBar/CircularProgressBar";
import useLoading from "@hooks/useLoading";
import useSidebarListToggle from "@components/Sidebar/hooks/useSidebarListToggle";

const SETTINGS_KEY = "appSettings";

function App() {
  const { isLoading, progress } = useLoading();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [askedForTask, setAskedForTask] = useState<string>("");

  const [count, setCount] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(300);
  const [isAlertOn, setIsAlertOn] = useState<boolean>(false);
  const [isAutoSwitchOn, setAutoSwitchOn] = useState<boolean>(true);
  const [isNewTaskOnTop, setIsNewTaskOnTop] = useState<boolean>(false);
  const [alarmName, setAlarmName] = useState<string>("");
  const [bgImg, setBgImg] = useState<string>("");
  const [theme, setTheme] = useState("default");

  const {
    isSidebarListOpen,
    setSidebarListOpen,
    currentSelectedTaskList,
    setCurrentSelectedTaskList,
  } = useSidebarListToggle();
  const {
    tasks,
    setTasks,
    handleDeleteAll,
    openTask,
    setOpenTask,
    isMassDelete,
    currentTask,
    setCurrentTask,
  } = useTasks();

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
  }, []);

  useEffect(() => {
    ApplyBodyStyles(bgImg, theme);
  }, [bgImg, theme]);

  if (isLoading) {
    return (
      <div className={styles.progressBarArea}>
        <ProgressBar width={100} progress={progress * 3} />
      </div>
    );
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

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
          onClose={() => setModalOpen(false)}
        />
      )}
      <div className={styles.innerContainer}>
        <div className={styles.bodyContainer}>
          <div className={styles.bodyInnerContainer}>
            <div className={styles.settingHeaderContainer}>
              <a href="/" className={styles.title}>
                <GemLogo aria-label="Gem Icon" className={styles.icon} />
              </a>
              <Dropdown
                stateHandlers={{
                  Settings: setModalOpen,
                  Lists: setSidebarListOpen,
                }}
              >
                <SettingButton
                  style={{ width: "20px", height: "20px" }}
                  aria-label="Setting Button"
                />
              </Dropdown>
            </div>
            <Timer
              count={count}
              breakDuration={breakDuration}
              setCount={setCount}
              setBreakDuration={setBreakDuration}
              isAutoSwitchOn={isAutoSwitchOn}
              handleDeleteAll={handleDeleteAll}
              isAlertOn={isAlertOn}
            />
            <TaskPanel
              currentSelectedTaskList={currentSelectedTaskList}
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
              onClick={toggleSidebar}
            />
          </div>
        </div>
      </div>
      <SidebarList
        setCurrentSelectedTaskList={setCurrentSelectedTaskList}
        setSidebarListOpen={setSidebarListOpen}
        isSidebarListOpen={isSidebarListOpen}
      />
      <Sidebar
        taskDescription={askedForTask}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
}

export default App;
