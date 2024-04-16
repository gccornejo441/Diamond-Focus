import React from 'react';
import { ReactComponent as PlayButton } from './assets/playButton.svg';
import { ReactComponent as PauseButton } from './assets/pauseButton.svg';
import { ReactComponent as ResetButton } from './assets/resetButton.svg';

import { Tooltip } from 'react-tooltip';
import styles from './ButtonPanel.module.css';
import OptionsPanel from './OptionsPanel';

const svgStyle = {
    width: '20px',
    height: '20px',
    fill: 'currentColor'
};

interface ButtonPanelProps {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
    setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
    isActive: boolean;
    setIsTimerOrBreak: React.Dispatch<React.SetStateAction<boolean>>;
    isTimerOrBreak: boolean;
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({
    setIsReset, setIsActive, setIsPaused, isActive, setIsTimerOrBreak, isTimerOrBreak }) => {
    const togglePlayPause = () => {
        setIsActive(!isActive);
        setIsPaused(isActive);
    };

    const reset = () => {
        setIsReset(true);
        setIsActive(false);
        setIsPaused(false);
    };

    return (
        <div className={styles.buttonPanel}>
            <button onClick={togglePlayPause} className={styles.controlButton}>
                {isActive ? (
                    <PauseButton style={svgStyle} aria-label="Pause" />
                ) : (
                    <PlayButton style={svgStyle} aria-label="Play" />
                )}
            </button>
            <button onClick={reset} className={styles.controlButton}>
                <ResetButton style={svgStyle} aria-label="Reset" />
            </button>
            <OptionsPanel
                setIsReset={setIsReset}
                setIsTimerOrBreak={setIsTimerOrBreak}
                isTimerOrBreak={isTimerOrBreak}
                isActive={isActive} />
            <Tooltip id="panelTooltip" />
        </div>
    );
};

export default ButtonPanel;