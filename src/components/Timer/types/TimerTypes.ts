export interface TimerProps {
  isAlertOn: boolean;
  handleDeleteAll: (removeTask: boolean, massDelete: boolean) => void;
  isAutoSwitchOn: boolean;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  breakDuration: number;
  setBreakDuration: React.Dispatch<React.SetStateAction<number>>;
}

export interface TimerDisplayProps {
  count: number;
  breakDuration: number;
  isBreak: boolean;
  initialCount: number;
  initialBreakDuration: number;
}
