import { TimePadder } from "@utilities/helpers";
import styles from "../styles/TimerDisplay.module.css";
import { TimerDisplayProps } from "../types/TimerTypes";

const TimerDisplay = ({
  count,
  breakDuration,
  isBreak,
  initialCount,
  initialBreakDuration,
}: TimerDisplayProps) => {
  const totalDuration = isBreak ? initialBreakDuration : initialCount;
  const remainingTime = isBreak ? breakDuration : count;
  const progress = ((totalDuration - remainingTime) / totalDuration) * 100;

  return (
    <div className={styles.timerBox}>
      <div className={styles.timerFont}>
        <span>{isBreak ? TimePadder(breakDuration) : TimePadder(count)}</span>
      </div>
      <div className={styles.timerProgressBar}>
        <div
          className={`${styles.timerProgress} ${isBreak ? styles.breakProgress : styles.focusProgress}`}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
};

export default TimerDisplay;
