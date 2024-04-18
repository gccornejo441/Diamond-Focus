import * as React from 'react';
import stylesApp from './App.module.css';
import Timer from './components/Timer';
import PopupSetting from './components/theme/PopupSetting';
import styles from './components/ButtonPanel.module.css';
import TaskPanel from './components/TaskPanel';
import SettingPanel from './components/theme/SettingPanel';
import settingStyles from './components/theme/Setting.module.css';
import { ReactComponent as CherryIcon } from './components/assets/cherryIcon.svg';

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
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
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

  return (
    <div className={stylesApp.App}>
      <div className={settingStyles.settingButtonPanel}>
        <div className={settingStyles.settingHeaderContainer}>
          <h1>
            <a href="/" className={settingStyles.title}><CherryIcon aria-label="Cherry Icon" className={settingStyles.icon} /></a>
          </h1>
          <MenuButton onclick={handleClick} />
        </div>
      </div>

      <div className={stylesApp.bodyContainer}>
        <div className={stylesApp.bodyInnerContainer}>
          <PopupSetting
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}>
            <SettingPanel 
            onClose={() => setModalOpen(false)}
            />
          </PopupSetting>
          <Timer />
          <TaskPanel />
        </div>
      </div>

    </div>
  );
}

export default App;
