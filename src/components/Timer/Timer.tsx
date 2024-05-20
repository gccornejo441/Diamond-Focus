import { useState, useEffect } from "react";
import styles from "./Timer.module.css";
import { TimePadder } from "../../utilities/helpers";
import ButtonPanel from "../ButtonPanel/ButtonPanel";
import useTimerEffect from "@hooks/useTimerEffect";
import { getParsedSettings } from "@components/Setting/export";
import SciFiAlarm from "@assets/sciFiAlarm.mp3";

interface TimerModuleProps {
  count: number;
  breakDuration: number;
  isBreak: boolean;
}

const TimerModule = ({ count, breakDuration, isBreak }: TimerModuleProps) => (
  <div className={styles.timerBox}>
    <div className={styles.timerFont}>
      <span>{isBreak ? TimePadder(breakDuration) : TimePadder(count)}</span>
    </div>
  </div>
);

interface TimerProps {
  isAlertOn: boolean;
  handleDeleteAll: (removeTask: boolean, massDelete: boolean) => void;
  isAutoSwitchOn: boolean;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  breakDuration: number;
  setBreakDuration: React.Dispatch<React.SetStateAction<number>>;
}

const Timer = ({
  isAlertOn,
  handleDeleteAll,
  isAutoSwitchOn,
  count,
  breakDuration,
  setCount,
  setBreakDuration,
}: TimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isBreak, setIsBreak] = useState(false);
  const [initialState, setInitialState] = useState(true);

  useEffect(() => {
    const timerWorker = new Worker("worker.js");
    setWorker(timerWorker);

    timerWorker.onmessage = (event) => {
      const currentTime = event.data;

      if (isRunning && !isBreak) {
        setCount(currentTime);
      }
      if (isRunning && isBreak) {
        setBreakDuration(currentTime);
      }
    };

    return () => timerWorker.terminate();
  }, [isRunning, isBreak]);

  useEffect(() => {
    let title = "Diamond Focus - Ready";

    if (isRunning && !initialState) {
      const timeLeft = isBreak ? TimePadder(breakDuration) : TimePadder(count);
      title = `${timeLeft} - ${isBreak ? "☕ Break Time" : "⏰ Focus Time"}`;
    } else if (!initialState) {
      title = `${isBreak ? TimePadder(breakDuration) : TimePadder(count)} - ⏸️ Paused`;
    } else {
      document.title = title;
      setInitialState(false);
    }

    document.title = title;
  }, [isRunning, isBreak, count, breakDuration]);

  const completeReset = () => {
    const settings = getParsedSettings("appSettings");
    if (!settings) return;

    const initialCount = parseInt(`${settings.count}` || "1500");
    const initialBreakDuration = parseInt(`${settings.breakDuration}` || "300");

    if (isBreak) {
      if (isAutoSwitchOn) setIsBreak(false);
      setBreakDuration(initialBreakDuration);
      worker?.postMessage({ command: "reset", seconds: initialBreakDuration });
    } else {
      if (isAutoSwitchOn) setIsBreak(true);
      setCount(initialCount);
      worker?.postMessage({ command: "reset", seconds: initialCount });
    }
    setIsRunning(false);
  };

  const changeIsBreak = () => {
    const settings = getParsedSettings("appSettings");
    if (!settings) return;

    if (isBreak) {
      setIsBreak(false);
      setCount(parseInt(`${settings.count}` || "1500"));
    } else {
      setIsBreak(true);
      setBreakDuration(parseInt(`${settings.breakDuration}` || "300"));
    }
  };

  useTimerEffect({
    isRunning,
    worker,
    count,
    isBreak,
    breakDuration,
    isAlertOn,
    completeReset,
    SciFiAlarm: SciFiAlarm,
  });

  return (
    <div className={styles.timerContainer}>
      <TimerModule
        isBreak={isBreak}
        breakDuration={breakDuration}
        count={count}
      />
      <ButtonPanel
        handleDeleteAll={handleDeleteAll}
        isBreak={isBreak}
        isRunning={isRunning}
        handlePlayPause={() => setIsRunning(!isRunning)}
        changeIsBreak={changeIsBreak}
        onReset={completeReset}
      />
    </div>
  );
};

export default Timer;
