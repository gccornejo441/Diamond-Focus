import { TimePadder } from "@utilities/helpers";
import styles from "../styles/TimerIsland.module.css";

interface TimerIslandProps {
  isBreak: boolean;
  breakDuration: number;
  count: number;
  isRunning: boolean;
}

const TimerIsland = ({
  count,
  breakDuration,
  isBreak,
  isRunning,
}: TimerIslandProps) => {
  return (
    <div
      className={`${styles.timerIsland} ${isBreak ? styles.break : styles.running} ${isRunning ? styles.fast : ""}`}
    >
      <span className={styles.timerRing} />
      <span className={styles.timerBorder} />
      <span className={styles.timerText}>
        <span>{isBreak ? TimePadder(breakDuration) : TimePadder(count)}</span>
      </span>
    </div>
  );
};

export default TimerIsland;
