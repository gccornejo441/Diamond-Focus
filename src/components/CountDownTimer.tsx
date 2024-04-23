import React, { useState, useEffect } from 'react';
import styles from './Timer.module.css';
import buttonStyles from './ButtonPanel.module.css';
import settingStyles from './theme/Setting.module.css';
import { formatTime } from '../utils';
import CountDownSetting from './theme/CountDownSetting';

interface TimerModuleProps {
    count: number;
}

interface ButtonPanelProps {
    onReset: () => void;
    setIsRunning: (value: boolean) => void;
}

const MenuButton = ({ onclick }: { onclick: () => void }) => (
    <button onClick={onclick} className={settingStyles.buttonMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" className={styles.icon}>
            <path fill="currentColor" d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" />
        </svg>
    </button>
);

const TimerModule = ({ count }: TimerModuleProps) => (
    <div className={styles.timerBox}>
        <div className={styles.timerFont}>
            <span>{formatTime(count)}</span>
        </div>
    </div>
);

const ButtonPanel = ({ onReset, setIsRunning }: ButtonPanelProps) => (
    <div className={buttonStyles.buttonPanel}>
        <button onClick={() => setIsRunning(true)} className={buttonStyles.controlButton}>Start</button>
        <button onClick={() => setIsRunning(false)} className={buttonStyles.controlButton}>Pause</button>
        <button onClick={onReset} className={buttonStyles.controlButton}>Reset</button>
    </div>
);

const CountDownTimer = ({ isModalOpen, setModalOpen }: { isModalOpen: boolean, setModalOpen: (value: boolean) => void }) => {
    const [count, setCount] = useState(parseInt(localStorage.getItem('count') || '1500'));
    const [isRunning, setIsRunning] = useState(false);
    const [worker, setWorker] = useState<Worker | null>(null);
    // const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const timerWorker = new Worker('worker.js');
        setWorker(timerWorker);

        timerWorker.onmessage = (event) => {
            setCount(event.data);
        };

        return () => timerWorker.terminate();
    }, []);

    useEffect(() => {
        if (isRunning) {
            worker?.postMessage({
                command: 'start',
                seconds: count
            });
        } else {
            worker?.postMessage({ command: 'pause' });
        }
    }, [isRunning, worker, count]);

    const handleReset = () => {
        setCount(parseInt(localStorage.getItem('count') || '1500'));
        setIsRunning(false);
        worker?.postMessage({ command: 'reset', seconds: 1500 });
    };



    return (
        <div className={styles.timerContainer}>
            <TimerModule count={count} />
            <ButtonPanel onReset={handleReset} setIsRunning={setIsRunning} />
            {isModalOpen && (
                <CountDownSetting
                    count={count}
                    setCount={setCount}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

export default CountDownTimer;
