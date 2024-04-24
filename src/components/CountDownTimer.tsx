import { useState, useEffect } from 'react';
import styles from './Timer.module.css';
import buttonStyles from './ButtonPanel.module.css';
import { formatTime } from '../utils';
import CountDownSetting from './theme/CountDownSetting';
import { ReactComponent as PlayButton } from './assets/playButton.svg';
import { ReactComponent as PauseButton } from './assets/pauseButton.svg';
import { ReactComponent as ResetButton } from './assets/resetButton.svg';
import { ReactComponent as CouchButton } from './assets/couchButton.svg';
import { ReactComponent as TimerButton } from './assets/timerButton.svg';

import { Tooltip } from 'react-tooltip';

interface TimerModuleProps {
    count: number;
    breakDuration: number;
    isBreak: boolean;
}

interface ButtonPanelProps {
    onReset: () => void;
    isRunning: boolean;
    handlePlayPause: () => void;
    changeIsBreak: () => void;
    isBreak: boolean;
}

const svgStyle = {
    width: '20px',
    height: '20px',
    fill: 'currentColor'
};

const TimerModule = ({ count, breakDuration, isBreak }: TimerModuleProps) => (
    <div className={styles.timerBox}>
        <div className={styles.timerFont}>
            <span>{isBreak ? formatTime(breakDuration) : formatTime(count)}</span>
        </div>
        <div><span>{isBreak ? 'Break' : 'Timer'}</span></div>
    </div>
);

const ButtonPanel = ({ onReset, handlePlayPause, isBreak, changeIsBreak, isRunning }: ButtonPanelProps) => (
    <div className={buttonStyles.buttonPanel}>
        <button
            data-tooltip-id="panelTooltip"
            data-tooltip-place='bottom'
            data-tooltip-content={!isRunning ? 'Play' : 'Pause'}
            onClick={handlePlayPause} className={buttonStyles.controlButton}>
            {<>{!isRunning ? (
                <PlayButton style={svgStyle} aria-label="Play" />
            ) : (
                <PauseButton style={svgStyle} aria-label="Pause" />
            )}</>}</button>
        <button
            data-tooltip-id="panelTooltip"
            data-tooltip-place='bottom'
            data-tooltip-content='Reset'
            className={buttonStyles.controlButton}
            onClick={onReset}>
            <ResetButton style={svgStyle} aria-label="Reset" />
        </button>
        <button
            data-tooltip-id="panelTooltip"
            data-tooltip-place='bottom'
            data-tooltip-content={isBreak ? 'Break' : 'Timer'}
            onClick={changeIsBreak}
            className={buttonStyles.controlButton}>
            {isBreak ? <CouchButton style={svgStyle} aria-label="Couch" /> : <TimerButton style={svgStyle} aria-label="Timer" />}
        </button>
        <Tooltip className='tootipStyles' id="panelTooltip" />
    </div>
);

const CountDownTimer = ({ isModalOpen, setModalOpen }: { isModalOpen: boolean, setModalOpen: (value: boolean) => void }) => {
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

    }, [isRunning, worker, count, isBreak, breakDuration]);

    useEffect(() => {
        let title = "Diamond Focus - Ready";

        if (isRunning && !initialState) {
            const timeLeft = isBreak ? formatTime(breakDuration) : formatTime(count);
            title = `${timeLeft} - ${isBreak ? "☕ Break Time" : "⏰ Focus Time"}`;
        } else if (!initialState) {
            title = `${isBreak ? formatTime(breakDuration) : formatTime(count)} - ⏸️ Paused`;
        } else {
            document.title = title;
            setInitialState(false);
        }

        document.title = title;
    }, [isRunning, isBreak, count, breakDuration]);


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
                <CountDownSetting
                    setBreakDuration={setBreakDuration}
                    breakDuration={breakDuration}
                    count={count}
                    setCount={setCount}
                    onClose={() => setModalOpen(false)} />
            )}
        </div>
    );
};

export default CountDownTimer;
