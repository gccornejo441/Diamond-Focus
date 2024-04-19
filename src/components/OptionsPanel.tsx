import styles from './OptionsPanel.module.css';
import { ReactComponent as CouchButton } from './assets/couchButton.svg';
import { ReactComponent as TimerButton } from './assets/timerButton.svg';

const svgStyle = {
  width: '20px',
  height: '20px',
  fill: 'currentColor'
};

interface OptionsPanelProps {
  setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTimerOrBreak: React.Dispatch<React.SetStateAction<boolean>>;
  isTimerOrBreak: boolean;
  isActive: boolean;
}

const OptionsPanel = ({
  setIsTimerOrBreak,
  setIsReset,
  isTimerOrBreak,
  isActive }: OptionsPanelProps) => {
  const toggleTimerOrBreak = () => {
    
    if (!isTimerOrBreak || !isActive) {
      setIsTimerOrBreak(!isTimerOrBreak);
      setIsReset(true);
    } else {
      setIsTimerOrBreak(!isTimerOrBreak);
    }
  }

  return (
    <button
      data-tooltip-id="panelTooltip"
      data-tooltip-place='bottom'
      data-tooltip-content={isActive ? 'Break' : 'Timer'}
      className={isTimerOrBreak ? styles.buttonBreak : styles.buttonTimer}
      onClick={toggleTimerOrBreak}
    >
      {isTimerOrBreak ? <CouchButton style={svgStyle} aria-label="Couch" /> : <TimerButton style={svgStyle} aria-label="Timer" />}
    </button>
  );
}

export default OptionsPanel;
