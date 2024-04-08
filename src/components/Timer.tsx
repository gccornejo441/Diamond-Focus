import React, { useEffect, useState } from 'react';
import styles from './Timer.module.css';
import ButtonPanel from './ButtonPanel';
import { Helmet } from 'react-helmet';
import OptionsPanel from './OptionsPanel';
import useDocumentHead from '../hooks/useDocumentHead';

interface TimerModuleProps {
    minutes: number;
    seconds: number;
}

const TimerModule = ({ minutes, seconds }: TimerModuleProps) => {
    return (
        <div className={styles.timerBox}>
            <div className={styles.timerFont}>
                <span className={`${styles.timerFont}`}>{minutes}</span>
                <span>:</span>
                <span style={{ top: "0em" }}>{seconds === 0 ? "00" : seconds}</span>
            </div>
        </div>
    )
}

const DynamicHelmet = ({ isActive, isPaused, isCompleted, timer, minutes, seconds }: { isActive: boolean, isPaused: boolean, isCompleted: boolean, timer: boolean, minutes: number, seconds: number }) => {
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const titleSuffix = isCompleted ? " - Completed" : isPaused ? " - Paused" : isActive ? " - Active" : " - Ready";
    const faviconName = timer ? "/greenFavicon.ico" : "/greenFavicon.ico";
    const titleText = timer ? `${(minutes - 20)}:${formattedSeconds} Break ${titleSuffix}` : `${minutes}:${formattedSeconds} Timer ${titleSuffix}`;

    return (
        <Helmet>
            <link type="image/x-icon" rel="icon" href={faviconName} />
            <title>{titleText}</title>
        </Helmet>
    );
}

const Timer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    const [timer, setTimer] = useState<boolean>(false);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [breakSeconds, setBreakSeconds] = useState(0);
    
    useEffect(() => {
        let interval: any = null;

        if (isActive && !isPaused && !isCompleted && !isReset && !isStarted) {
            interval = setInterval(() => {

                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }

                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval);
                        setIsCompleted(true);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }

            }, 1000);
        }

        if (isReset) {
            setMinutes(25);
            setSeconds(0);
            setIsReset(false);
            setIsActive(false);
            setIsPaused(false);
            setIsCompleted(false);
        }

        return () => clearInterval(interval);
    }, [isActive, isPaused, isCompleted, isReset, isStarted, minutes, seconds, breakMinutes, breakSeconds]);


    return (
        <>
        <DynamicHelmet isActive={isActive} isPaused={isPaused} isCompleted={isCompleted} timer={timer} minutes={minutes} seconds={seconds} />
            <div className={styles.timerContainer}>
                <OptionsPanel
                    setTimer={setTimer}
                    timer={timer}
                    setIsReset={setIsReset}
                />
                <TimerModule
                    minutes={timer ? (minutes - 20) : minutes}
                    seconds={seconds} 
                    />
                <div className={styles.buttonPanel}>
                    <ButtonPanel
                        setIsReset={setIsReset}
                        setIsPaused={setIsPaused}
                        setIsActive={setIsActive}
                        isActive={isActive}
                    />
                </div>
            </div>
        </>
    );
}

export default Timer;
