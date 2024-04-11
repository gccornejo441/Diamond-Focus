import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styles from './Timer.module.css';
import ButtonPanel from './ButtonPanel';
import OptionsPanel from './OptionsPanel';

interface TimerModuleProps {
  minutes: number;
  seconds: string;
}

const TimerModule = ({ minutes, seconds }:TimerModuleProps) => (
  <div className={styles.timerBox}>
    <div className={styles.timerFont}>
      <span className={styles.timerFont}>{minutes}</span>
      <span>:</span>
      <span style={{ top: "0em" }}>{seconds}</span>
    </div>
  </div>
);

const DynamicHelmet = ({ isActive, isPaused, isCompleted, timer, minutes, seconds }: { isActive: boolean, isPaused: boolean, isCompleted: boolean, timer: boolean, minutes: number, seconds: number }) => {
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const titleSuffix = isCompleted ? " - Completed" : isPaused ? " - Paused" : isActive ? " - Active" : " - Ready";
    const faviconName = timer ? "/redTomatoIcon.ico" : "/greenTomatoIcon.ico";
    const titleText = timer ? `${minutes}:${formattedSeconds} Break ${titleSuffix}` : `${minutes}:${formattedSeconds} Timer ${titleSuffix}`;
  
    return (
      <Helmet>
        <link type="image/x-icon" rel="icon" href={faviconName} />
        <title>{titleText}</title>
      </Helmet>
    );
  }

const Timer = () => {
  const initialTime = 25 * 60;
  const [secondsLeft, setSecondsLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isActive) {
      intervalId = setInterval(() => {
        setSecondsLeft(seconds => seconds > 0 ? seconds - 1 : seconds);
      }, 1000);
    } else if (isReset) {
      setSecondsLeft(initialTime);
      setIsReset(false);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive, isReset, initialTime]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsActive(false);
      alert('Timer completed!');
    }
  }, [secondsLeft]);

  useEffect(() => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    document.title =  isActive ? `${minutes}:${formattedSeconds} Break - Active` : `${minutes}:${formattedSeconds} Timer - Active`;
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

  return (
    <>
      <DynamicHelmet isActive={isActive} isPaused={false} isCompleted={false} timer={true} minutes={minutes} seconds={seconds} />
      <OptionsPanel
        setTimer={setIsActive}
        timer={isActive}
        setIsReset={setIsReset}
      />
      <TimerModule
        minutes={minutes}
        seconds={formattedSeconds}
      />
      <div className={styles.buttonPanel}>
        <ButtonPanel
          setIsReset={() => setIsReset(true)}
          setIsPaused={() => setIsActive(!isActive)}
          setIsActive={() => setIsActive(!isActive)}
          isActive={isActive}
        />
      </div>
    </>
  );
}

export default Timer;
