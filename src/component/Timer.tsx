import React, { useEffect, useState } from 'react';
import styles from '../component/Timer.module.css';
import ButtonPanel from './ButtonPanel';
import { Helmet } from 'react-helmet';
import OptionsPanel from './OptionsPanel';

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
    }, [isActive, isPaused, isCompleted, isReset, isStarted, minutes, seconds]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className={styles.timerContainer}>
            <OptionsPanel 
            setTimer={setTimer}
            timer={timer}
            />
                {!timer ? (
                    <div className={styles.timerBox}>
                    <div className={styles.timerFont}>
                        <span id="minutesValue" className={`${styles.timerFont}`}>{minutes}</span>
                        <span>:</span>
                        <span id="secondsValue" style={{ top: "0em" }}>{seconds === 0 ? "00" : seconds}</span>
                    </div>
                </div>
                ) : (
                    <div className={styles.timerBox}>
                    <div className={styles.timerFont}>
                        <span id="minutesValue" className={`${styles.timerFont}`}>{breakMinutes}</span>
                        <span>:</span>
                        <span id="secondsValue" style={{ top: "0em" }}>{breakSeconds === 0 ? "00" : breakSeconds}</span>
                    </div>
                </div>
                )}
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
