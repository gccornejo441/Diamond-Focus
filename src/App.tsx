import * as React from 'react';
import './App.css';
import Timer from './components/Timer';
import PopupSetting from './components/theme/PopupSetting';
import styles from './components/ButtonPanel.module.css';
import TaskPanel from './components/TaskPanel';

interface ButtonProps {
  onclick: () => void;
}

const MenuButton = ({onclick} : ButtonProps) => {
  return (
    <button onClick={onclick} className={styles.buttonMenu}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" className={styles.icon}>
        <path fill="currentColor" d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" />
    </svg>
</button>  
)
}

function App() {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  }

  return (
    <div className="App">
      <div className={styles.settingButtonPanel}>
        <MenuButton onclick={handleClick}/>
      </div>
      <PopupSetting
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}>
        <h2>Modal Title</h2>
        <p>This is a modal content. You can put any React Component here.</p>
      </PopupSetting>
      <Timer />
      <TaskPanel />
    </div>
  );
}

export default App;
