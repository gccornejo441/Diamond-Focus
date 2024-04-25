import buttonStyles from './ButtonPanel.module.css';

import { ReactComponent as PlayButton } from './assets/playButton.svg';
import { ReactComponent as PauseButton } from './assets/pauseButton.svg';
import { ReactComponent as ResetButton } from './assets/resetButton.svg';
import { ReactComponent as CouchButton } from './assets/couchButton.svg';
import { ReactComponent as TimerButton } from './assets/timerButton.svg';

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
    fill: 'currentColor'
}


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

export default ButtonPanel;