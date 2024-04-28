import { useState, useEffect } from 'react';
import styles from './Timer.module.css';
import { TimePadder } from '../utils';
import Setting from './theme/Setting';
import SciFiAlarm from './assets/sciFiAlarm.mp3';
import ButtonPanel from './ButtonPanel';

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

const Timer = ({ isModalOpen, setModalOpen }: { isModalOpen: boolean, setModalOpen: (value: boolean) => void }) => {
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
        if (isRunning) {
            const seconds = isBreak ? breakDuration : count;
            worker?.postMessage({ command: 'start', seconds: seconds });
        } else {
            worker?.postMessage({ command: 'pause' });
        }

        if (count === 0 || breakDuration === 0) {
            completeReset();
            const audio = new Audio(SciFiAlarm);
            audio.play();
        }

    }, [isRunning, worker, count, isBreak, breakDuration]);

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

    return (
        <div className={styles.timerContainer}>
            <TimerModule isBreak={isBreak} breakDuration={breakDuration} count={count} />
            <ButtonPanel
                isBreak={isBreak}
                isRunning={isRunning}
                handlePlayPause={() => setIsRunning(!isRunning)}
                changeIsBreak={changeIsBreak}
                onReset={handleReset} />
            {isModalOpen && (
                <Setting
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