import { useEffect } from "react";

const useTimerEffect = ({
  isRunning,
  worker,
  count,
  isBreak,
  breakDuration,
  isAlertOn,
  completeReset,
  alarmSound,
}: {
  isRunning: boolean;
  worker: Worker | null;
  count: number;
  isBreak: boolean;
  breakDuration: number;
  isAlertOn: boolean;
  completeReset: () => void;
  alarmSound: string;
}) => {
  useEffect(() => {
    const audio = new Audio(alarmSound);

    if (isRunning) {
      const seconds = isBreak ? breakDuration : count;

      worker?.postMessage({ command: "start", seconds: seconds });
    } else {
      worker?.postMessage({ command: "pause" });
    }

    const shouldAlert =
      (isBreak && breakDuration === 0) || (!isBreak && count === 0);

    if (shouldAlert) {
      if (isAlertOn) {
        audio.play();
      } else {
        audio.pause();
      }
      completeReset();
    }
  }, [
    isRunning,
    worker,
    count,
    isBreak,
    breakDuration,
    isAlertOn,
    completeReset,
    alarmSound,
  ]);
};

export default useTimerEffect;
