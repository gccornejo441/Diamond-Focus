import React, { useEffect, useState } from 'react';
import styles from './Timer.module.css';
import ButtonPanel from './ButtonPanel';
import { Helmet } from 'react-helmet';
import SciFiAlarm from './assets/sciFiAlarm.mp3';

interface TimerModuleProps {
  isTimerOrBreak: boolean;
  seconds: number;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds.toString();
  return `${minutes}:${formattedSeconds}`;
};

const TimerModule = ({ isTimerOrBreak, seconds }: TimerModuleProps) => (
  <div className={styles.timerBox}>
    <div className={styles.timerFont}>
      <span>{formatTime(seconds)}</span>
    </div>
  </div>
);

interface TimerProps {
  pomodoroTime: number;
  breakTime: number;
}

const Timer = ({ pomodoroTime, breakTime }: TimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(pomodoroTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isTimerOrBreak, setIsTimerOrBreak] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [initialState, setInitialState] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isActive && !isPaused) {
      intervalId = setInterval(() => {
        setSecondsLeft(prevSeconds => prevSeconds > 0 ? prevSeconds - 1 : 0);
      }, 1000);
      
    } else if (!isActive && (secondsLeft === 0)) {
      const audio = new Audio(SciFiAlarm);
      audio.play();
      setIsTimerOrBreak(!isTimerOrBreak);
      setSecondsLeft(isTimerOrBreak ? breakTime * 60 : pomodoroTime * 60);
      setIsActive(true);
    }

    return () => {
      intervalId && clearInterval(intervalId);
    }
  }, [isActive, isPaused, secondsLeft, isTimerOrBreak, pomodoroTime, breakTime]);

  useEffect(() => {
    
    const documentTitle = (isActive ? (isPaused ? formatTime(secondsLeft) + ' ⏸️ Paused' : formatTime(secondsLeft) + ' ⏰ Active') : 'Diamond Focus - Ready');
    document.title = documentTitle;
  }, [secondsLeft, isActive, isPaused]);

  useEffect(() => {
    if (!isActive) {
      setSecondsLeft(isTimerOrBreak ? pomodoroTime * 60 : breakTime * 60);
    }
  }, [isActive, isTimerOrBreak, pomodoroTime, breakTime]);

  return (
    <div className={styles.timerContainer}>
      <Helmet>
        <link type="image/svg+xml" rel="icon" href="/favicon.svg" />
      </Helmet>
      <TimerModule isTimerOrBreak={isTimerOrBreak} seconds={secondsLeft} />
      <ButtonPanel
        setIsTimerOrBreak={setIsTimerOrBreak}
        isTimerOrBreak={isTimerOrBreak}
        setIsReset={() => {
          setIsActive(false);
          setSecondsLeft(isTimerOrBreak ? pomodoroTime * 60 : breakTime * 60);
        }}
        setInitialState={setInitialState}
        intialState={initialState}
        setIsPaused={setIsPaused}
        setIsActive={setIsActive}
        isActive={isActive}
        isPaused={isPaused}
      />
    </div>
  );
}

export default Timer;