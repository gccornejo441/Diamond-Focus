import { useEffect, useState } from 'react';
import styles from './Timer.module.css';
import ButtonPanel from './ButtonPanel';
import { Helmet } from 'react-helmet';
import SciFiAlarm from './assets/sciFiAlarm.mp3';

interface TimerModuleProps {
  minutes: number;
  formattedSeconds: string;
  isTimerOrBreak: boolean;
}

const TimerModule = ({ minutes, formattedSeconds, isTimerOrBreak }: TimerModuleProps) => {
  return (
    <div className={styles.timerBox}>
      <div className={styles.timerFont}>
        {isTimerOrBreak ? (
          <><span>{minutes}</span>:<span>{formattedSeconds}</span></>
        ) : (
          <><span>{minutes - 20}</span>:<span>{formattedSeconds}</span></>
        )}
      </div>
    </div>
  );
}

interface TimerProps {
  pomodoroTime: number;
}

const Timer = ({ pomodoroTime }: TimerProps) => {
  const initialTime = pomodoroTime * 60;
  const [secondsLeft, setSecondsLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isTimerOrBreak, setIsTimerOrBreak] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isActive && !isPaused) {
      intervalId = setInterval(() => {
        setSecondsLeft(seconds => seconds > 0 ? seconds - 1 : 0);
      }, 1000);
    } else if (isReset) {
      setSecondsLeft(initialTime);
      setIsReset(false);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive, isReset, initialTime, isPaused]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsActive(false);
      const audio = new Audio(SciFiAlarm);
      audio.play();
    }
  }, [secondsLeft, isTimerOrBreak]);

  useEffect(() => {
    const titleMinutes = Math.floor(secondsLeft / 60);
    const titleSeconds = secondsLeft % 60;
    const formattedSeconds = titleSeconds < 10 ? `0${titleSeconds}` : titleSeconds.toString();

    if (!isActive) {
      document.title = 'Diamond Focus - Ready';
    } else {
      document.title = `${titleMinutes}:${formattedSeconds} ${isActive ? (isPaused ? '⏸️ Paused' : '⏰ Active') : ''}`;
    }

    if (isPaused) {
      document.title = `${titleMinutes}:${formattedSeconds} ${isPaused ? '⏸️ Paused' : '⏰ Active'}`;
    }

    if (!isTimerOrBreak) {
      document.title = `${titleMinutes - 20}:${formattedSeconds} ${isPaused ? '⏸️ Paused' : '⏰ Active'}`;
    }

  }, [secondsLeft, isActive, isPaused, isTimerOrBreak]);

  useEffect(() => {
    setSecondsLeft(initialTime)
  }, [pomodoroTime]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

  return (
    <div className={styles.timerContainer}>
      <Helmet>
        <link
          type="image/svg+xml"
          rel="icon"
          href={isTimerOrBreak ? "/favicon.svg" : "/favicon.svg"} />
      </Helmet>
      <TimerModule
        minutes={minutes}
        formattedSeconds={formattedSeconds}
        isTimerOrBreak={isTimerOrBreak} />
      <ButtonPanel
        setIsTimerOrBreak={setIsTimerOrBreak}
        isTimerOrBreak={isTimerOrBreak}
        setIsReset={setIsReset}
        setIsPaused={setIsPaused}
        setIsActive={setIsActive}
        isActive={isActive}
      />
    </div>
  );
}

export default Timer;