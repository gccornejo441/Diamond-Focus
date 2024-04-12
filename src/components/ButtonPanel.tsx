import React from 'react';
import { ReactComponent as PlayButton } from './assets/playButton.svg';
import { ReactComponent as PauseButton } from './assets/pauseButton.svg';
import { ReactComponent as ResetButton } from './assets/resetButton.svg';
import { Tooltip } from 'react-tooltip'
import styles from './ButtonPanel.module.css';

const svgStyle = { 
    width: '50px', 
    height: '50px', 
    fill: 'currentColor' 
};

interface ButtonPanelProps {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
    setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
    isActive: boolean;
}

const ButtonPanel = ({ setIsReset, setIsActive, setIsPaused, isActive }: ButtonPanelProps) => {
    const handlePlayPause = () => {
        if (!isActive) {
            setIsActive(true);
            setIsPaused(false);
        } else {
            setIsPaused(true);
            setIsActive(false);
        }
    };

    const handleReset = () => {
        setIsReset(true);
        setIsActive(false);
        setIsPaused(false);
    };

    return (
        <div className={styles.buttonPanel}>
            <a href="#$$$"   
                data-tooltip-id="panelTooltip"
                data-tooltip-place='bottom'
                data-tooltip-content={isActive ? 'Pause' : 'Play'}
                onClick={handlePlayPause}>
                {isActive ? 
                <PauseButton 
                style={svgStyle} /> : 
                <PlayButton 
                style={svgStyle} />}
            </a>
            <a href="#$$$"
            data-tooltip-id="panelTooltip"
            data-tooltip-content="Reset"
            data-tooltip-place='bottom'
            onClick={handleReset}>
                <ResetButton style={svgStyle} />
            </a>
            <Tooltip id="panelTooltip" />
        </div>
    );
};

export default ButtonPanel;
