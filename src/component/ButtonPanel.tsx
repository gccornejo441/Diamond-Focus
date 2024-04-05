import React from 'react';
import { ReactComponent as PlayButton } from './assets/playButton.svg';
import { ReactComponent as ResetButton } from './assets/resetButton.svg';
import { ReactComponent as StopButton } from './assets/stopButton.svg';

const svgStyle = { width: '24px', height: '24px', fill: 'currentColor' };

const ButtonPanel = () => {
    const handlePlay = () => {
        console.log('Play');
    };

    const handleReset = () => {
        console.log('Reset');
    };

    const handleStop = () => {
        console.log('Stop');
    };

    return (
        <div className="col-lg-12 text-center">
            <a href="#play" onClick={(e) => {e.preventDefault(); handlePlay();}}>
                <PlayButton style={svgStyle} />
            </a>
            <a href="#reset" onClick={(e) => {e.preventDefault(); handleReset();}}>
                <ResetButton style={svgStyle} />
            </a>
            <a href="#stop" onClick={(e) => {e.preventDefault(); handleStop();}}>
                <StopButton style={svgStyle} />
            </a>
        </div>
    );
};

export default ButtonPanel;
