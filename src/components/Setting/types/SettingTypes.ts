interface SettingsProps {
  count: number;
  breakDuration: number;
  isAlertOn: boolean;
  isAutoSwitchOn: boolean;
  theme: string;
  bgImg: string;
  alarmName: string;
  isNewTaskOnTop: boolean;
}

interface SettingPanelProps extends SettingsProps {
  onClose: () => void;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setBreakDuration: React.Dispatch<React.SetStateAction<number>>;
  setIsAlertOn: React.Dispatch<React.SetStateAction<boolean>>;
  setAutoSwitchOn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNewTaskOnTop: React.Dispatch<React.SetStateAction<boolean>>;
  setBgImg: React.Dispatch<React.SetStateAction<string>>;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  setAlarmName: React.Dispatch<React.SetStateAction<string>>;
}

export type { SettingsProps, SettingPanelProps };
