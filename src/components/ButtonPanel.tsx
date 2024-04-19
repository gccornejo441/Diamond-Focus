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
    isPaused: boolean;
    setInitialState: React.Dispatch<React.SetStateAction<boolean>>;
    intialState: boolean;
}

const ButtonPanel = ({ setIsReset, isPaused, setIsActive, setIsPaused, isActive, setIsTimerOrBreak, isTimerOrBreak, setInitialState, intialState }: ButtonPanelProps) => {

    const togglePlayPause = () => {

        if (intialState) {
            setIsActive(true);
            setInitialState(false);
        }

        if (isActive && !isPaused) {
            setIsPaused(true);
        } else if (isActive && isPaused) {
            setIsActive(true);
            setIsPaused(false);
        } else {
            setIsActive(true);
        }
    };

    const reset = () => {
        setIsReset(true);
        setIsActive(false);
        setIsPaused(false);
    };

    return (
        <div className={styles.buttonPanel}>
            <button
                data-tooltip-id="panelTooltip"
                data-tooltip-place='bottom'
                data-tooltip-content={isActive ? 'Play' : 'Pause'}
                onClick={togglePlayPause}
                className={styles.controlButton}>
                {intialState ? <PlayButton style={svgStyle} aria-label="Play" /> : <>{isPaused ? (
                    <PlayButton style={svgStyle} aria-label="Play" />
                ) : (
                    <PauseButton style={svgStyle} aria-label="Pause" />
                )}</>}
            </button>
            <button
                data-tooltip-id="panelTooltip"
                data-tooltip-place='bottom'
                data-tooltip-content='Reset'
                onClick={reset} className={styles.controlButton}>
                <ResetButton style={svgStyle} aria-label="Reset" />
            </button>
            <OptionsPanel
                setIsReset={setIsReset}
                setIsTimerOrBreak={setIsTimerOrBreak}
                isTimerOrBreak={isTimerOrBreak}
                isActive={isActive} />
            <Tooltip className='tootipStyles' id="panelTooltip" />
        </div>
    );
};

export default ButtonPanel;
