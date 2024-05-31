import styles from "./ButtonPanel.module.css";
import PlayButton from "@assets/playIcon.svg?react";
import PauseButton from "@assets/pauseIcon.svg?react";
import ResetButton from "@assets/resetIcon.svg?react";
import MoonButton from "@assets/moonIcon.svg?react";
import TimerButton from "@assets/timerIcon.svg?react";
import { Tooltip } from "react-tooltip";

interface ButtonPanelProps {
  onReset: () => void;
  handlePlayPause: () => void;
  isBreak: boolean;
  changeIsBreak: () => void;
  isRunning: boolean;
}

const ButtonPanel = ({
  onReset,
  handlePlayPause,
  isBreak,
  changeIsBreak,
  isRunning,
}: ButtonPanelProps) => (
  <div className={styles.buttonPanel}>
    <button
      data-tooltip-id="panelTooltip"
      data-tooltip-place="bottom"
      data-tooltip-delay-show={700}
      data-tooltip-content={!isRunning ? "Play" : "Pause"}
      onClick={handlePlayPause}
      className="controlButton"
    >
      {
        <>
          {!isRunning ? (
            <PlayButton className={styles.svgStyle} aria-label="Play" />
          ) : (
            <PauseButton className={styles.svgStyle} aria-label="Pause" />
          )}
        </>
      }
    </button>
    <button
      data-tooltip-id="panelTooltip"
      data-tooltip-place="bottom"
      data-tooltip-delay-show={700}
      data-tooltip-content="Reset"
      className="controlButton"
      onClick={onReset}
    >
      <ResetButton className={styles.svgStyle} aria-label="Reset" />
    </button>
    <button
      data-tooltip-id="panelTooltip"
      data-tooltip-place="bottom"
      data-tooltip-delay-show={700}
      data-tooltip-content={isBreak ? "Timer" : "Break"}
      onClick={changeIsBreak}
      className="controlButton"
    >
      {isBreak ? (
        <TimerButton className={styles.svgStyle} aria-label="Timer" />
      ) : (
        <MoonButton className={styles.svgStyle} aria-label="Break" />
      )}
    </button>
    <Tooltip className="tootipStyles" id="panelTooltip" />
  </div>
);

export default ButtonPanel;
