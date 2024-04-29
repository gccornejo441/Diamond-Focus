import buttonStyles from './ButtonPanel.module.css';

import { ReactComponent as PlayButton } from '../assets/playButton.svg';
import { ReactComponent as PauseButton } from '../assets/pauseButton.svg';
import { ReactComponent as ResetButton } from '../assets/resetButton.svg';
import { ReactComponent as CouchButton } from '../assets/couchIcon.svg';
import { ReactComponent as TimerButton } from '../assets/timerIcon.svg';

import { Tooltip } from 'react-tooltip';

interface ButtonPanelProps {
    onReset: () => void;
    handlePlayPause: () => void;
    isBreak: boolean;
    changeIsBreak: () => void;
    isRunning: boolean;
}

const svgStyle = {
    width: '20px',
    height: '20px',
    fill: '#fff',
}

const ButtonPanel = ({ onReset, handlePlayPause, isBreak, changeIsBreak, isRunning }: ButtonPanelProps) => (
    <div className={buttonStyles.buttonPanel}>
        <button
            data-tooltip-id="panelTooltip"
            data-tooltip-place='bottom'
            data-tooltip-content={!isRunning ? 'Play' : 'Pause'}
            onClick={handlePlayPause} 
            className="controlButton">
            {<>{!isRunning ? (
                <PlayButton style={svgStyle} aria-label="Play" />
            ) : (
                <PauseButton style={svgStyle} aria-label="Pause" />
            )}</>}</button>
        <button
            data-tooltip-id="panelTooltip"
            data-tooltip-place='bottom'
            data-tooltip-content='Reset'
            className="controlButton"
            onClick={onReset}>
            <ResetButton style={svgStyle}  aria-label="Reset" />
        </button>
        <button
            data-tooltip-id="panelTooltip"
            data-tooltip-place='bottom'
            data-tooltip-content={isBreak ? 'Break' : 'Timer'}
            onClick={changeIsBreak}
            className="controlButton">
            {isBreak ? <TimerButton style={svgStyle} aria-label="Timer" /> : <CouchButton style={svgStyle} aria-label="Break" />}
        </button>
        <Tooltip className='tootipStyles' id="panelTooltip" />
    </div>
);

export default ButtonPanel;