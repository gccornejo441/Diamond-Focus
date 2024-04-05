import React, { useEffect, useState } from 'react';
import styles from '../component/Timer.module.css';
import ButtonPanel from './ButtonPanel';

const Timer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [isStarted, setIsStarted] = useState(false);


    useEffect(() => {
        let interval: any = null;

        if (isActive && !isPaused && !isStopped && !isCompleted && !isReset && !isStarted) {
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

        return () => clearInterval(interval);

    })

    return (
        <div className="col-lg-12 text-center p-2">
            <div className="timer-time timer-container">
                <div className={`${styles.timerBox} ${styles.timerFont}`}>
                    <span id="minutesValue" style={{ top: "0em" }}>{minutes}</span>
                    <span>:</span>
                    <span id="secondsValue" style={{ top: "0em" }}>{seconds}</span>
                </div>
            </div>
            <div>
                <ButtonPanel />
            </div>
        </div>
    );
}

export default Timer;
