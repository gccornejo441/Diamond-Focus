import { useState, useEffect } from 'react';
import stylesApp from './App.module.css';
import Timer from './components/Timer';
import PopupSetting from './components/theme/PopupSetting';
import styles from './components/ButtonPanel.module.css';
import TaskPanel from './components/TaskPanel';
import SettingPanel from './components/theme/SettingPanel';
import settingStyles from './components/theme/Setting.module.css';
import { ReactComponent as GemIcon } from './components/assets/gemIcon.svg';
import CountDownTimer from './components/CountDownTimer';

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
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.setAttribute('data-theme', savedTheme);
      setTimeout(() => setIsLoading(false), 100);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setPomodoroTime(Number(localStorage.getItem('pomodoroTime')));
    setBreakTime(Number(localStorage.getItem('breakTime')));

  }, [pomodoroTime, setPomodoroTime, breakTime, setBreakTime]);

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
            <a href="/" className={settingStyles.title}>
              <GemIcon aria-label="Gem Icon" className={settingStyles.icon} />
            </a>
          </h1>
          <MenuButton  onclick={handleClick} />
        </div>
      </div>

      <div className={stylesApp.bodyContainer}>
        <div className={stylesApp.bodyInnerContainer}>
        <CountDownTimer isModalOpen={isModalOpen} setModalOpen={setModalOpen}  />

          {/* <PopupSetting
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}>
            <SettingPanel
              breakTime={breakTime}
              setBreakTime={setBreakTime}
              pomodoroTime={pomodoroTime}
              setPomodoroTime={setPomodoroTime}
              onClose={() => setModalOpen(false)}
            />
          </PopupSetting>
          <Timer
            breakTime={breakTime}
            pomodoroTime={pomodoroTime} />
          <TaskPanel /> */}
        </div>
      </div>

    </div>
  );
}

export default App;
