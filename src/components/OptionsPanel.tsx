import styles from './OptionsPanel.module.css';

interface OptionsPanelProps {
    setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
    setIsTimerOrBreak: React.Dispatch<React.SetStateAction<boolean>>;
    isTimerOrBreak: boolean;
    isActive: boolean;
}

const OptionsPanel = ({ setIsReset, setIsTimerOrBreak, isTimerOrBreak, isActive }: OptionsPanelProps) => {
    const handleTimerOrBreakChange = () => {
        if (isTimerOrBreak) {
          setIsTimerOrBreak(false);
          setIsReset(true);
        }
        else if (!isTimerOrBreak && !isActive) {
          setIsTimerOrBreak(!isTimerOrBreak);
          setIsReset(true);
        }
      }

      
    return (
        <div className={styles.optionsPanelContainer}>
            {isTimerOrBreak
                ? <button className={styles.buttonBreak} onClick={handleTimerOrBreakChange}>Break</button>
                : <button className={styles.buttonTimer} onClick={handleTimerOrBreakChange}>Timer</button>}
        </div>
    );
}

export default OptionsPanel;