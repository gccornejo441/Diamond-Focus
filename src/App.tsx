import { useState, useEffect, useMemo } from "react";
import styles from "./App.module.css";
import { TaskPanel } from "@components/TaskPanel";
import { Timer } from "@components/Timer";
import { Clock } from "@components/Clock";
import { ApplyBodyStyles } from "@utilities/helpers";
import Dropdown from "@components/Dropdown/Dropdown";
import useTasks from "@hooks/useTasks";
import SettingButton from "@assets/menuIcon.svg?react";
import ProgressBar from "@components/ProgressBar/CircularProgressBar";
import useLoading from "@hooks/useLoading";
import {
  Settings,
  SettingsProps,
  getParsedSettings,
} from "@components/Setting";
import { SidebarList, Task, useSidebarListToggle } from "@components/Sidebar";
import SideMenu from "@components/Sidebar/components/SideMenu/SideMenu";
import { Sidebar } from "@components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "@components/SignIn/SignIn";
import { Popup } from "@components/Popup";
const SETTINGS_KEY = "appSettings";
import { useAuth } from "@utilities/AuthContext";
import { IconName } from "@utilities/dropDownHelpers";
import useLocalStorageObjectState from "@hooks/useLocalStorageObjectState";
import ListButton from "@assets/listIcon.svg?react";
import GemLogo from "@assets/gemIcon.svg?react";
function App() {
  const { isLoading, progress } = useLoading();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSignModalOpen, setSignModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [askedForTask, setAskedForTask] = useState<Task | null>(null);

  const [count, setCount] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(300);
  const [isAlertOn, setIsAlertOn] = useState<boolean>(false);
  const [isAutoSwitchOn, setAutoSwitchOn] = useState<boolean>(true);
  const [isNewTaskOnTop, setIsNewTaskOnTop] = useState<boolean>(false);
  const [alarmName, setAlarmName] = useState<string>("");
  const [bgImg, setBgImg] = useState<string>("");
  const [theme, setTheme] = useState("default");
  const [timerStatus, setTimerStatus] = useLocalStorageObjectState(
    "appSettings",
    "timerStatus",
    true
  );

  const { user, logout } = useAuth();
  const { isSidebarListOpen, setSidebarListOpen } = useSidebarListToggle();

  const stateHandlers = useMemo(
    () => ({
      Settings: () => setModalOpen(true),
      "Add list": () => setSidebarListOpen(true),
      "Sign in": () => setSignModalOpen(true),
      "Sign out": () => logout(),
      "Timer On": () => setTimerStatus(true),
      "Timer Off": () => setTimerStatus(false),
    }),
    [setSidebarListOpen, logout]
  );

  const names = useMemo(
    () => [
      { name: "Settings" as IconName },
      { name: "Add list" as IconName },
      { name: (user ? "Sign out" : "Sign in") as IconName },
      { name: (timerStatus ? "Timer Off" : "Timer On") as IconName },
    ],
    [user, timerStatus]
  );

  const {
    saveEdit,
    setAsFavorite,
    toggleTaskCompletion,
    taskLists,
    setTaskLists,
    tasks,
    setTasks,
    handleDeleteAll,
    openTask,
    setOpenTask,
    isMassDelete,
    currentTask,
    setCurrentTask,
    currentSelectedTaskList,
    setCurrentSelectedTaskList,
    moveTaskToList,
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
      setAlarmName(settings.alarmName);
      setTimerStatus(settings.timerStatus);
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

  const toggleSidebar = (task: Task | null) => {
    setSidebarOpen(!isSidebarOpen);
    setAskedForTask(task!);
  };

  return (
    <div className={styles.App}>
      <SideMenu
        isSidebarListOpen={isSidebarListOpen}
        setSidebarListOpen={setSidebarListOpen}
      />
      <Popup isOpen={isSignModalOpen} onClose={() => setSignModalOpen(false)}>
        <SignIn onClose={() => setSignModalOpen(false)} />
      </Popup>
      {isModalOpen && (
        <Settings
          setTaskLists={setTaskLists}
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
          setTimerStatus={setTimerStatus}
          timerStatus={timerStatus}
        />
      )}
      <div className={styles.main}>
        <SidebarList
          taskLists={taskLists}
          setTaskLists={setTaskLists}
          setCurrentSelectedTaskList={setCurrentSelectedTaskList}
          setSidebarListOpen={setSidebarListOpen}
          isSidebarListOpen={isSidebarListOpen}
        />
        <div className={styles.mainContent}>
          <div className={styles.bodyContent}>
            <div className={styles.settingHeaderContainer}>
              <button
                aria-label="Toggle Sidebar"
                aria-controls="toggle-sidebar"
                id="toggle-sidebar"
                className={`${styles.sideMenuButton} controlButton`}
                onClick={() => setSidebarListOpen(true)}
              >
                <ListButton className={styles.svgStyle} />
              </button>
              <a href="/" className={styles.gemIcon}>
                <GemLogo aria-label="Gem Icon" className={styles.topIconSvg} />
              </a>
              <Dropdown
                alignment="right"
                names={names}
                stateHandlers={stateHandlers}
              >
                <SettingButton className={styles.svgStyle} />
              </Dropdown>
            </div>
            {timerStatus ? (
              <Timer
                count={count}
                breakDuration={breakDuration}
                setCount={setCount}
                setBreakDuration={setBreakDuration}
                isAutoSwitchOn={isAutoSwitchOn}
                isAlertOn={isAlertOn}
              />
            ) : (
              <Clock />
            )}
            <TaskPanel
              saveEdit={saveEdit}
              toggleTaskCompletion={toggleTaskCompletion}
              setAsFavorite={setAsFavorite}
              taskLists={taskLists}
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
              toggleSidebar={toggleSidebar}
              moveTaskToList={moveTaskToList}
            />
          </div>
          <Sidebar
            saveEdit={saveEdit}
            handleDeleteAll={handleDeleteAll}
            toggleTaskCompletion={toggleTaskCompletion}
            setAsFavorite={setAsFavorite}
            selectedTaskToView={askedForTask}
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
      </div>
      <ToastContainer className="toast-container" />
    </div>
  );
}

export default App;
