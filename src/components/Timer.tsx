import React, { useEffect, useState } from 'react';
import styles from './Timer.module.css';
import ButtonPanel from './ButtonPanel';
import { Helmet } from 'react-helmet';
import OptionsPanel from './OptionsPanel';

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

const DynamicHelmet = ({ isActive, isPaused, isCompleted, timer, minutes, seconds }: { isActive: boolean, isPaused: boolean, isCompleted: boolean, timer: boolean, minutes: number, seconds: number }) => {
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const titleSuffix = isCompleted ? " - Completed" : isPaused ? " - Paused" : isActive ? " - Active" : " - Ready";
  const faviconName = timer ? "/greenTomatoIcon.ico" : "/redTomatoIcon.ico";
  const titleText = timer ? `${(minutes - 20)}:${formattedSeconds} Break ${titleSuffix}` : `${minutes}:${formattedSeconds} Timer ${titleSuffix}`;

  return (
    <Helmet>
      <link type="image/x-icon" rel="icon" href={faviconName} />
      <title>{titleText}</title>
    </Helmet>
  );
}


const Timer = () => {
  const [initialTitle, setInitialTitle] = useState<boolean>(true);
  const initialTime = 25 * 60;
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
      alert(`${isTimerOrBreak ? 'Timer' : 'Break'} completed!`);
    }
  }, [secondsLeft, isTimerOrBreak]);


  useEffect(() => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

    if (initialTitle) {
      document.title = 'Pomodoro Cherry - Ready';
      setInitialTitle(false);
    } else {
      if (isTimerOrBreak) {
        document.title = !isActive ? `${minutes}:${formattedSeconds} ⏰ Active` : `${minutes}:${formattedSeconds} ⏸️ Paused`;
      } else {
        document.title = !isActive ? `${minutes - 20}:${formattedSeconds} ⏰ Active` : `${minutes - 20}:${formattedSeconds} ⏸️ Paused`;
      }
    }

  }, [secondsLeft, isActive, initialTitle, isTimerOrBreak]);


  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

  return (
    <div className={styles.timerContainer}>
      <Helmet>
        <link
          type="image/x-icon"
          rel="icon"
          href={isTimerOrBreak ? "/redTomatoIcon.ico" : "/greenTomatoIcon.ico"} />
      </Helmet>
      <TimerModule
        minutes={minutes}
        formattedSeconds={formattedSeconds}
        isTimerOrBreak={isTimerOrBreak} />
      <div className={styles.controlContainer}>
        <OptionsPanel
          setIsReset={setIsReset}
          setIsTimerOrBreak={setIsTimerOrBreak}
          isTimerOrBreak={isTimerOrBreak}
          isActive={isActive} />
        <ButtonPanel
          setIsReset={setIsReset}
          setIsPaused={setIsPaused}
          setIsActive={setIsActive}
          isActive={isActive}
        />
      </div>
    </div>
  );
}

export default Timer;
