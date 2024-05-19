export interface SettingsProps {
  count: number;
  breakDuration: number;
  isAlertOn: boolean;
  isAutoSwitchOn: boolean;
  theme: string;
  bgImg: string;
  alarmSoundName: string;
  isNewTaskOnTop: boolean;
}

export interface SettingPanelProps {
  onClose: () => void;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  breakDuration: number;
  setBreakDuration: React.Dispatch<React.SetStateAction<number>>;
  isAlertOn: boolean;
  setIsAlertOn: React.Dispatch<React.SetStateAction<boolean>>;
  isAutoSwitchOn: boolean;
  setAutoSwitchOn: React.Dispatch<React.SetStateAction<boolean>>;
  isNewTaskOnTop: boolean;
  setIsNewTaskOnTop: React.Dispatch<React.SetStateAction<boolean>>;
  bgImg: string;
  setBgImg: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  alarmName: string;
  setAlarmName: React.Dispatch<React.SetStateAction<string>>;
}
