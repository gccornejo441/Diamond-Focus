import React, { useEffect, useState } from "react";
import { ApplyBodyStyles } from "../../../utilities/helpers";
import {
  getParsedSettings,
  settingFormHelper,
  styles,
  SettingPanelProps,
} from "../export";
import ThemeSelector from "./SettingThemeSelector";

export const SettingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="6" cy="10" r="2" />
    <line x1="6" y1="4" x2="6" y2="8" />
    <line x1="6" y1="12" x2="6" y2="20" />
    <circle cx="12" cy="16" r="2" />
    <line x1="12" y1="4" x2="12" y2="14" />
    <line x1="12" y1="18" x2="12" y2="20" />
    <circle cx="18" cy="7" r="2" />
    <line x1="18" y1="4" x2="18" y2="5" />
    <line x1="18" y1="9" x2="18" y2="20" />
  </svg>
);

const Settings = ({
  onClose,
  setCount,
  setBreakDuration,
  isAlertOn,
  setIsAlertOn,
  isAutoSwitchOn,
  setAutoSwitchOn,
  isNewTaskOnTop,
  setIsNewTaskOnTop,
  bgImg,
  setBgImg,
  theme,
  setTheme,
  alarmName,
}: SettingPanelProps) => {
  const [tempTheme, setTempTheme] = useState<string>("");
  const [tempBgImg, setTempBgImg] = useState<string>("");
  const [tempCount, setTempCount] = useState<number>(25);
  const [tempBreakDuration, setTempBreakDuration] = useState<number>(5);

  useEffect(() => {
    setTempTheme(theme);
    setTempBgImg(bgImg);
    const settings = getParsedSettings("appSettings");
    if (!settings) return;

    setTempCount(settings.count / 60);
    setTempBreakDuration(settings.breakDuration / 60);
  }, []);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const settings = settingFormHelper(formData);

    setCount(settings.count);
    setBreakDuration(settings.breakDuration);

    setIsAlertOn(settings.isAlertOn);
    setAutoSwitchOn(settings.isAutoSwitchOn);
    setIsNewTaskOnTop(settings.isNewTaskOnTop);

    ApplyBodyStyles(settings.bgImg, settings.theme);

    setBgImg(settings.bgImg);
    setTheme(settings.theme);

    localStorage.setItem("appSettings", JSON.stringify(settings));

    onClose();
  };

  const handleReset = () => {
    const defaultCount = 1500;
    const defaultBreak = 300;
    const defaultAlert = true;
    const defaultAutoSwitch = true;
    const defaultTheme = "default";
    const defaultBgImg = "";
    const defaultNewTaskOnTop = true;

    setCount(defaultCount);
    setBreakDuration(defaultBreak);
    setIsAlertOn(defaultAlert);
    setAutoSwitchOn(defaultAutoSwitch);
    setBgImg(defaultBgImg);
    setIsNewTaskOnTop(defaultNewTaskOnTop);

    document.body.style.backgroundImage = "";
    document.body.setAttribute("data-theme", defaultTheme);

    localStorage.removeItem("bgImg");
    localStorage.removeItem("appSettings");
    localStorage.setItem(
      "appSettings",
      JSON.stringify({
        count: defaultCount,
        breakDuration: defaultBreak,
        isAlertOn: defaultAlert,
        isAutoSwitchOn: defaultAutoSwitch,
        theme: defaultTheme,
        bgImg: defaultBgImg,
        isNewTaskOnTop: defaultNewTaskOnTop,
      }),
    );

    onClose();
  };

  const clearWebImageUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBgImg("");
  };

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
  };

  const handleCancel = () => {
    setBgImg(tempBgImg);
    ApplyBodyStyles(tempBgImg, tempTheme);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <a
          onClick={handleCancel}
          className={styles.modalClose}
          aria-label="Close"
        >
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className={styles.icon}
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </a>
        <aside className={styles.sidebar}>
          <header>
            <h1 className={styles.title}>Settings</h1>
          </header>
          <ul className={styles.menu}>
            <li className={styles.activeMenuItem}>
              <a className={styles.menuLink}>
                <span className={styles.menuIcon}>
                  <SettingIcon />
                </span>
                <strong className={styles.menuText}>General</strong>
              </a>
            </li>
          </ul>
        </aside>
        <div className={styles.content}>
          <h2>General Settings</h2>
          <form method="post" onSubmit={handleSave}>
            <div className={styles.timerSettings}>
              <div className={styles.timerSetting}>
                <label htmlFor="focusTimer">Focus Time (minutes):</label>
                <input
                  type="number"
                  id="focusTimer"
                  name="focusTimer"
                  min="1"
                  max="60"
                  step="1"
                  value={tempCount}
                  onChange={(e) =>
                    setTempCount(
                      Math.max(1, Math.min(60, parseInt(e.target.value))),
                    )
                  }
                  className={styles.settingInput}
                />
              </div>

              <div className={styles.timerSetting}>
                <label htmlFor="breakTimer">Break Time (minutes):</label>
                <input
                  type="number"
                  id="breakTimer"
                  name="breakTimer"
                  min="1"
                  max="60"
                  step="1"
                  value={tempBreakDuration}
                  onChange={(e) =>
                    setTempBreakDuration(
                      Math.max(1, Math.min(60, parseInt(e.target.value))),
                    )
                  }
                  className={styles.settingInput}
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
                  <label
                    htmlFor="autoSwitch"
                    className={styles.toggleLabel}
                  ></label>
                </div>
              </div>

              <div className={styles.timerSetting}>
                <label htmlFor="alarmMuter">Enable Alarm:</label>
                <div className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    id="alarmMuter"
                    name="alarmMuter"
                    checked={isAlertOn}
                    onChange={(e) => setIsAlertOn(e.target.checked)}
                    className={styles.toggleInput}
                  />
                  <label
                    htmlFor="alarmMuter"
                    className={styles.toggleLabel}
                  ></label>
                </div>
              </div>

              <div className={styles.timerSetting}>
                <label htmlFor="newTasksOnTop">New Tasks On Top:</label>
                <div className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    id="newTasksOnTop"
                    name="newTasksOnTop"
                    checked={isNewTaskOnTop}
                    onChange={(e) => setIsNewTaskOnTop(e.target.checked)}
                    className={styles.toggleInput}
                  />
                  <label
                    htmlFor="newTasksOnTop"
                    className={styles.toggleLabel}
                  ></label>
                </div>
              </div>

              <div className={styles.timerSetting}>
                <label htmlFor="alarmSoundName">Alarm Sound:</label>
                <select
                  id="alarmSoundName"
                  name="alarmSoundName"
                  value={alarmName}
                  onChange={(e) => e.target.value}
                  className={styles.settingInput}
                  disabled={!isAlertOn}
                >
                  <option value="SciFi Alert">SciFi Alert</option>
                </select>
              </div>

              <div className={styles.timerSetting}>
                <label htmlFor="bgImg">Background Image Link:</label>
                <div className={styles.inputWithClear}>
                  <input
                    type="url"
                    name="bgImg"
                    value={bgImg}
                    onChange={(e) => setBgImg(e.target.value)}
                    className={styles.settingInput}
                    placeholder="Enter image URL"
                  />
                  {bgImg && (
                    <button
                      onClick={clearWebImageUrl}
                      className={styles.clearButton}
                      aria-label="Clear image URL"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.timerSetting}>
                <label htmlFor="themeSelector">Theme:</label>
                <ThemeSelector
                  selectedTheme={theme}
                  onChangeTheme={handleThemeChange}
                />
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.saveButton}>
                Save
              </button>
              <button onClick={handleReset} className={styles.resetButton}>
                Reset
              </button>
              <button onClick={handleCancel} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
