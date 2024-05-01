import { useState, useEffect } from 'react';
import styles from './Timer.module.css';
import { TimePadder } from '../../utils';
import Setting from '../Setting';
import ButtonPanel from '../ButtonPanel/ButtonPanel';
import SciFiAlarm from '../assets/sciFiAlarm.mp3';
import useTimerEffect from '../../hooks/useTimerEffect';

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
    isModalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    isAlertOn: boolean;
    setIsAlertOn: React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteAll: (removeTask: boolean, massDelete: boolean) => void;
}

const Timer = ({ isModalOpen, setModalOpen, isAlertOn, setIsAlertOn, handleDeleteAll }: TimerProps) => {
    const [count, setCount] = useState(parseInt(localStorage.getItem('count') || '1500'));
    const [breakDuration, setBreakDuration] = useState(parseInt(localStorage.getItem('breakDuration') || '300'));
    const [isRunning, setIsRunning] = useState(false);
    const [worker, setWorker] = useState<Worker | null>(null);
    const [isBreak, setIsBreak] = useState(false);
    const [initialState, setInitialState] = useState(true);

    useEffect(() => {
        const timerWorker = new Worker('worker.js');
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
        const initialCount = parseInt(localStorage.getItem('count') || '1500');
        const initialBreakDuration = parseInt(localStorage.getItem('breakDuration') || '300');

        if (isBreak) {
            setBreakDuration(initialBreakDuration);
            worker?.postMessage({ command: 'reset', seconds: initialBreakDuration });
        } else {
            setCount(initialCount);
            worker?.postMessage({ command: 'reset', seconds: initialCount });
        }

        setIsRunning(false)
    };

    const handleReset = () => {
        const initialCount = parseInt(localStorage.getItem('count') || '1500');
        setCount(initialCount);

        const initialBreakDuration = parseInt(localStorage.getItem('breakDuration') || '300');
        setBreakDuration(initialBreakDuration);

        if (isBreak) {
            worker?.postMessage({ command: 'reset', seconds: initialBreakDuration });
        } else {
            worker?.postMessage({ command: 'reset', seconds: initialCount });
        }
    };

    const changeIsBreak = () => {
        if (isBreak) {
            setIsBreak(false);
            setCount(parseInt(localStorage.getItem('count') || '1500'));
        } else {
            setIsBreak(true);
            setBreakDuration(parseInt(localStorage.getItem('breakDuration') || '300'));
        }
    }

    useTimerEffect({ isRunning, worker, count, isBreak, breakDuration, isAlertOn, completeReset, SciFiAlarm: SciFiAlarm });

    return (
        <div className={styles.timerContainer}>
            <TimerModule isBreak={isBreak} breakDuration={breakDuration} count={count} />
            <ButtonPanel
                handleDeleteAll={handleDeleteAll}
                isBreak={isBreak}
                isRunning={isRunning}
                handlePlayPause={() => setIsRunning(!isRunning)}
                changeIsBreak={changeIsBreak}
                onReset={handleReset} />
            {isModalOpen && (
                <Setting
                    isAlertOn={isAlertOn}
                    setIsAlertOn={setIsAlertOn}
                    setBreakDuration={setBreakDuration}
                    breakDuration={breakDuration}
                    count={count}
                    setCount={setCount}
                    onClose={() => setModalOpen(false)} />
            )}
        </div>
    );
};

export default Timer;