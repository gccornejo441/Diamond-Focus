import styles from './OptionsPanel.module.css';

interface OptionsPanelProps {
    setTimer: React.Dispatch<React.SetStateAction<boolean>>;
    timer: boolean;
}

const OptionsPanel = ({ setTimer, timer }: OptionsPanelProps) => {
    const toggleTimer = () => {
        setTimer(!timer);
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