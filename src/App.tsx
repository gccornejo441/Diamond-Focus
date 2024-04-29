import { useState, useEffect } from 'react';
import TaskPanel from './components/TaskPanel/TaskPanel';
import Timer from './components/Timer/Timer';
import { ReactComponent as GemIcon } from './components/assets/gemIcon.svg';
import { ReactComponent as SettingButton } from './components/assets/settingButton.svg';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [askedForTask, setAskedForTask] = useState<string>("");
  const [isAlertOn, setIsAlertOn] = useState<boolean>(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
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
            <SettingButton aria-label="Setting Button" />
          </button>
        </div>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.bodyInnerContainer}>
          <Timer setIsAlertOn={setIsAlertOn} isAlertOn={isAlertOn} isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
          <TaskPanel setAskedForTask={setAskedForTask} onClick={toggleSidebar} />
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