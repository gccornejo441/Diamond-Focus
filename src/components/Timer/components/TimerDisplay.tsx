import styles from "../styles/TimerDisplay.module.css";
import { TimerDisplayProps } from "../types/TimerTypes";
import TimerIsland from "./TimerIsland";

const TimerDisplay = ({ count, breakDuration, isBreak }: TimerDisplayProps) => {
  return (
    <div className={styles.timerBox}>
      <div className={styles.timerFont}>
        <TimerIsland
          isBreak={isBreak}
          breakDuration={breakDuration}
          count={count}
        />
      </div>
    </div>
  );
};

export default TimerDisplay;
