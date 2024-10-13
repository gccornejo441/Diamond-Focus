import React, { useEffect, useState } from "react";
import styles from "../styles/Setting.module.css";
import CustomNumberInput from "./CustomNumberInput";
import { TimerSettingsProps } from "../types/SettingTypes";
import { getParsedSettings } from "../utils/Settings";
import { toast } from "react-toastify";

const TimerSettings = ({
  isAlertOn,
  isAutoSwitchOn,
  setCount,
  setBreakDuration,
  setIsAlertOn,
  setAutoSwitchOn,
}: TimerSettingsProps) => {
  const [tempCount, setTempCount] = useState<number>(25);
  const [tempBreakDuration, setTempBreakDuration] = useState<number>(5);

  useEffect(() => {
    const settings = getParsedSettings("appSettings");
    if (!settings) return;

    setTempCount(settings.count / 60);
    setTempBreakDuration(settings.breakDuration / 60);
  }, []);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const existingSettings = getParsedSettings("appSettings") || {};

    const updatedSettings = {
      ...existingSettings,
      count: tempCount * 60,
      breakDuration: tempBreakDuration * 60,
      isAlertOn,
      isAutoSwitchOn,
    };

    setCount(updatedSettings.count);
    setBreakDuration(updatedSettings.breakDuration);
    setIsAlertOn(updatedSettings.isAlertOn);
    setAutoSwitchOn(updatedSettings.isAutoSwitchOn);

    localStorage.setItem("appSettings", JSON.stringify(updatedSettings));

    toast("Timer settings saved successfully!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className={styles.content}>
      <h2>Timer Settings</h2>
      <form method="post" onSubmit={handleSave}>
        <div className={styles.timerSetting}>
          <label htmlFor="focusTimer">Focus Timer (minutes):</label>
          <CustomNumberInput
            id="focusTimer"
            name="focusTimer"
            min={1}
            max={60}
            step={1}
            value={tempCount}
            onChange={(value) => setTempCount(Math.max(1, Math.min(60, value)))}
          />
        </div>

        <div className={styles.timerSetting}>
          <label htmlFor="breakTimer">Break Time (minutes):</label>
          <CustomNumberInput
            id="breakTimer"
            name="breakTimer"
            min={1}
            max={60}
            step={1}
            value={tempBreakDuration}
            onChange={(value) =>
              setTempBreakDuration(Math.max(1, Math.min(60, value)))
            }
          />
        </div>

        <div className={styles.timerSetting}>
          <label htmlFor="autoSwitch">Auto Switch:</label>
          <div className={styles.toggleSwitch}>
            <input
              type="checkbox"
              id="autoSwitch"
              name="autoSwitch"
              checked={isAutoSwitchOn}
              onChange={(e) => setAutoSwitchOn(e.target.checked)}
              className={styles.toggleInput}
            />
            <label htmlFor="autoSwitch" className={styles.toggleLabel}></label>
          </div>
        </div>

        <div className={styles.timerSetting}>
          <label htmlFor="alarmMuter">Auto Switch:</label>
          <div className={styles.toggleSwitch}>
            <input
              type="checkbox"
              id="alarmMuter"
              name="alarmMuter"
              checked={isAlertOn}
              onChange={(e) => setIsAlertOn(e.target.checked)}
              className={styles.toggleInput}
            />
            <label htmlFor="alarmMuter" className={styles.toggleLabel}></label>
          </div>
        </div>

        <button type="submit" className={styles.button}>
          Save Timer Settings
        </button>
      </form>
    </div>
  );
};

export default TimerSettings;
