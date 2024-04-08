import React from 'react';
import { ReactComponent as PlayButton } from './assets/playButton.svg';
import { ReactComponent as ResetButton } from './assets/resetButton.svg';
import { ReactComponent as PausedButton } from './assets/pauseButton.svg';

import styles from './ButtonPanel.module.css';

const svgStyle = { 
    width: '50px', 
    height: '50px', 
    fill: 'currentColor' 
};

interface ButtonPanelProps {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
    // setIsStopped: React.Dispatch<React.SetStateAction<boolean>>;
    // setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
    setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
    // setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
    // setMinutes: React.Dispatch<React.SetStateAction<number>>;
    // setSeconds: React.Dispatch<React.SetStateAction<number>>;
    // minutes: number;
    // seconds: number;
    // isActive: boolean;
    // isPaused: boolean;
    // isStopped: boolean;
    // isCompleted: boolean;
}

const ButtonPanel = ({ 
    setIsReset,
    setIsActive, 
    setIsPaused }: ButtonPanelProps) => {
    const handlePlay = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsActive(true);
    };
    
    const handlePause = () => {
        setIsPaused(true);

        setIsActive(false);
    }

    const handleReset = () => {
        setIsReset(true);

        setIsActive(false);
    };

    return (
        <div className={styles.buttonPanel}>
            <a href="#play" onClick={handlePlay}>
                <PlayButton style={svgStyle} />
            </a>
            <a href="#reset" onClick={handleReset}>
                <ResetButton style={svgStyle} />
            </a>
            <a href="#stop" onClick={handlePause}>
                <PausedButton style={svgStyle} />
            </a>
        </div>
    );
};

export default ButtonPanel;
