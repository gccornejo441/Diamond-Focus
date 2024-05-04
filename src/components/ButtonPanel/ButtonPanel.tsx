import buttonStyles from './ButtonPanel.module.css';

import { ReactComponent as PlayButton } from '../assets/playIcon.svg';
import { ReactComponent as PauseButton } from '../assets/pauseIcon.svg';
import { ReactComponent as ResetButton } from '../assets/resetIcon.svg';
import { ReactComponent as CouchButton } from '../assets/couchIcon.svg';
import { ReactComponent as TimerButton } from '../assets/timerIcon.svg';
import { ReactComponent as DeleteButton } from '../assets/deleteIcon.svg';
import { Tooltip } from 'react-tooltip';

interface ButtonPanelProps {
    onReset: () => void;
    handlePlayPause: () => void;
    isBreak: boolean;
    changeIsBreak: () => void;
    isRunning: boolean;
    handleDeleteAll: (removeTask: boolean, massDelete: boolean) => void;
}

const svgStyle = {
    width: '20px',
    height: '20px',
    fill: '#FFF'
}

const svgTimerStyle = {
    width: '20px',
    height: '20px',
}

const ButtonPanel = ({ handleDeleteAll, onReset, handlePlayPause, isBreak, changeIsBreak, isRunning }: ButtonPanelProps) => (
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
            <ResetButton style={svgStyle} aria-label="Reset" />
        </button>
        <button
            data-tooltip-id="panelTooltip"
            data-tooltip-place='bottom'
            data-tooltip-content={isBreak ? 'Timer' : 'Break'}
            onClick={changeIsBreak}
            className="controlButton">
            {isBreak ? <TimerButton style={svgTimerStyle} aria-label="Timer" /> : <CouchButton style={svgStyle} aria-label="Break" />}
        </button>
        <button
            data-tooltip-id="panelTooltip"
            data-tooltip-place='bottom'
            data-tooltip-content="Delete All Tasks"
            onClick={() => handleDeleteAll(false, true)}
            className="controlButton">
            <DeleteButton style={svgTimerStyle} aria-label="Delete" /></button>
        <Tooltip className='tootipStyles' id="panelTooltip" />
    </div>
);

export default ButtonPanel;