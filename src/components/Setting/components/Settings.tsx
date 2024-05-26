import React, { useEffect, useState } from "react";
import { ApplyBodyStyles } from "../../../utilities/helpers";
import {
  getParsedSettings,
  settingFormHelper,
  styles,
  SettingPanelProps,
} from "../export";
import ThemeSelector from "./SettingThemeSelector";
import SettingsButton from "@assets/settingsIcon.svg?react";
import CloseButton from "@assets/closeIcon.svg?react";
import CustomSelectDropdown from "./CustomSelectDropdown";
import CustomNumberInput from "./CustomNumberInput";
import CustomTextInput from "./CustomTextInput";

const options = [
  { value: "sciFiAlarm", label: "Sci-Fi Alarm" },
  { value: "beepWarning", label: "Space Alarm" },
  { value: "newSubscriberAlert", label: "New Subscriber" },
  { value: "simpAlert", label: "Simple Alert" },
  { value: "redAlertNuclearBuzzer", label: "Red Alert Buzzer" },
];

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
  setAlarmName,
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
    setTheme(tempTheme);
    ApplyBodyStyles(tempBgImg, tempTheme);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button
          type="button"
          onClick={handleCancel}
          className={styles.modalClose}
          aria-label="Close"
        >
          <CloseButton className={styles.svgStyle} />
        </button>
        <aside className={styles.sidebar}>
          <header>
            <h1 className={styles.title}>Settings</h1>
          </header>
          <ul className={styles.menu}>
            <li className={styles.activeMenuItem}>
              <a className={styles.menuLink}>
                <span className={styles.menuLinkContent}>
                  <SettingsButton className={styles.svgStyle} />
                  <span className={styles.menuText}>General</span>
                </span>
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
                <CustomNumberInput
                  id="focusTimer"
                  name="focusTimer"
                  min={1}
                  max={60}
                  step={1}
                  value={tempCount}
                  onChange={(value) =>
                    setTempCount(Math.max(1, Math.min(60, value)))
                  }
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
                <CustomSelectDropdown
                  id="alarmSoundName"
                  name="alarmSoundName"
                  value={alarmName}
                  onChange={(e) => setAlarmName(e.target.value)}
                  disabled={!isAlertOn}
                  options={options}
                />
              </div>

              <div className={styles.timerSetting}>
                <label htmlFor="bgImg">Background Image Link:</label>
                <div className={styles.inputWithClear}>
                  {/* <CustomTextInput
                    type="url"
                    name="bgImg"
                    value={bgImg}
                    onChange={(e) => setBgImg(e.target.value)}
                    placeholder="Enter image URL"
                  /> */}
                  <input
                    type="url"
                    name="bgImg"
                    value={bgImg}
                    onChange={(e) => setBgImg(e.target.value)}
                    placeholder="Enter image URL"
                  />
                  <CustomTextInput
                    type="url"
                    name="bgImg"
                    value={bgImg}
                    onChange={(e) => setBgImg(e.target.value)}
                    placeholder="Enter image URL"
                  />
                  {bgImg && (
                    <button
                      onClick={clearWebImageUrl}
                      className={styles.clearButton}
                      aria-label="Clear image URL"
                    >
                      <CloseButton className={styles.svgStyle} />
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
