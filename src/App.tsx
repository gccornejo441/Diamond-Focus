import { useState, useEffect } from 'react';
import TaskPanel from './components/TaskPanel';
import Timer from './components/Timer';
import { ReactComponent as GemIcon } from './components/assets/gemIcon.svg';

import stylesApp from './App.module.css';
import styles from './components/ButtonPanel.module.css';
import settingStyles from './components/theme/Setting.module.css';
import Sidebar from './components/Sidebar';

interface ButtonProps {
  onclick: () => void;
}

const MenuButton = ({ onclick }: ButtonProps) => {
  return (
    <button onClick={onclick} className={settingStyles.buttonMenu}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" className={styles.icon}>
        <path fill="currentColor" d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" />
      </svg>
    </button>
  )
}

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [askedForTask, setAskedForTask] = useState<string>("");
  

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.setAttribute('data-theme', savedTheme);
      setTimeout(() => setIsLoading(false), 100);
    } else {
      setIsLoading(false);
    }
  }, []);


  const handleClick = () => {
    setModalOpen(true);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className={stylesApp.App}>
      <div className={settingStyles.settingButtonPanel}>
        <div className={settingStyles.settingHeaderContainer}>
          <h1>
            <a href="/" className={settingStyles.title}>
              <GemIcon aria-label="Gem Icon" className={settingStyles.icon} />
            </a>
          </h1>
          <MenuButton onclick={handleClick} />
        </div>
      </div>

      <div className={stylesApp.bodyContainer}>
        <div className={stylesApp.bodyInnerContainer}>
          <Timer isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
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