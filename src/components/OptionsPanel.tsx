import styles from './OptionsPanel.module.css';

interface OptionsPanelProps {
    setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
    setTimer: React.Dispatch<React.SetStateAction<boolean>>;
    timer: boolean;
}

const OptionsPanel = ({ setIsReset, setTimer, timer }: OptionsPanelProps) => {
    const toggleTimer = () => {
        setTimer(!timer);
        setIsReset(true)
    };
    return (
        <div className={styles.optionsPanelContainer}>
            {!timer
                ? <button className={styles.buttonBreak} onClick={toggleTimer}>Break</button>
                : <button className={styles.buttonTimer} onClick={toggleTimer}>Timer</button>}
        </div>
    );
}

export default OptionsPanel;