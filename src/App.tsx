import { useState, useEffect } from 'react';
import TaskPanel, { Task } from './components/TaskPanel/TaskPanel';
import Timer from './components/Timer/Timer';
import { ReactComponent as GemIcon } from './components/assets/gemIcon.svg';
import { ReactComponent as SettingButton } from './components/assets/settingButton.svg';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [openTask, setOpenTask] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [askedForTask, setAskedForTask] = useState<string>("");
  const [isAlertOn, setIsAlertOn] = useState<boolean>(true);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isMassDelete, setIsMassDelete] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedBgImg = localStorage.getItem('bgImg');
    
    if (savedBgImg) {
      document.body.style.backgroundImage = `url('${savedBgImg}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundColor = 'linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.75) 100%)';
      document.body.style.backdropFilter = 'blur(5px) brightness(0.8)';
      setTimeout(() => setIsLoading(false), 100);
    }
    
    if (savedTheme) {
      document.body.setAttribute('data-theme', savedTheme);
      setTimeout(() => setIsLoading(false), 100);
    } else {
      setIsLoading(false);
    }
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
          <Timer handleDeleteAll={handleDeleteAll} setIsAlertOn={setIsAlertOn} isAlertOn={isAlertOn} isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
          <TaskPanel isMassDelete={isMassDelete} handleDeleteAll={handleDeleteAll} currentTask={currentTask} setCurrentTask={setCurrentTask} openTask={openTask} setOpenTask={setOpenTask} tasks={tasks} setTasks={setTasks} setAskedForTask={setAskedForTask} onClick={toggleSidebar} />
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