import React, { useEffect, useState } from "react";
import styles from "../styles/Setting.module.css";
import { ApplyBodyStyles, Toast } from "@utilities/helpers";
import CustomThemeSelector from "./CustomThemeSelector";
import SettingsButton from "@assets/settingsIcon.svg?react";
import CloseButton from "@assets/closeIcon.svg?react";
import ExportImportButton from "@assets/exportImportIcon.svg?react";
import ShareStreamButton from "@assets/shareStreamIcon.svg?react";
import TimerButton from "@assets/timerIcon.svg?react";
import CustomSelectDropdown from "./CustomSelectDropdown";
import CustomTextInput from "./CustomTextInput";

import { SettingPanelProps } from "../types/SettingTypes";
import { settingFormHelper } from "../utils/Settings";
import { toast } from "react-toastify";
import MenuItem from "./CustomMenuItem";
import ImportExportTasks from "./ImportExportTasks";
import { Task, TaskListProps } from "@components/Sidebar";
import ShareStream from "@components/ShareStream/ShareStream";
import Journal from "../components/Journal";
import JournalButton from "@assets/journalIcon.svg?react";
import StoredFilesButton from "@assets/storedFilesIcon.svg?react";
import StoredFiles from "./StoredFiles";
import TimerSettings from "./TimerSettings";

const options = [{ value: "sciFiAlarm", label: "Sci-Fi Alarm" }];

export interface RenderExportImportTasksProps {
  importTasks: (tasks: Task[]) => void;
  exportTasks: () => Task[];
}

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
  setTaskLists,
  count,
  breakDuration,
  timerStatus,
  isDueDateNotificationsOn,
  setIsDueDateNotificationsOn,
  defaultAlertBefore,
  setDefaultAlertBefore,
  useBrowserNotifications,
  setUseBrowserNotifications,
}: SettingPanelProps) => {
  const [tempTheme, setTempTheme] = useState<string>(theme);
  const [tempBgImg, setTempBgImg] = useState<string>(bgImg);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [activePanel, setActivePanel] = useState<string>("settings");
  const [tempCount, setTempCount] = useState<number>(count);
  const [tempBreakDuration, setTempBreakDuration] =
    useState<number>(breakDuration);

  useEffect(() => {
    setTempTheme(theme);
    setTempBgImg(bgImg);
    setTempCount(count);
    setTempBreakDuration(breakDuration);
  }, [theme, bgImg]);

  const importTasks = (taskLists: TaskListProps[]) => {
    setTaskLists(taskLists);
    localStorage.setItem("taskLists", JSON.stringify(taskLists));
    Toast("Tasks imported successfully and saved to local storage!");
  };

  const handleSaveGeneralSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    let settings = settingFormHelper(formData);
    // formData.append("count", `${tempCount}`);
    // formData.append("breakDuration", `${tempBreakDuration}`);

    settings = {
      ...settings,
      count: tempCount,
      breakDuration: tempBreakDuration,
      timerStatus: timerStatus,
      isDueDateNotificationsOn,
      defaultAlertBefore,
      useBrowserNotifications,
    };

    ApplyBodyStyles(settings.bgImg, settings.theme);

    setBgImg(settings.bgImg);
    setTheme(settings.theme);
    setIsDueDateNotificationsOn(settings.isDueDateNotificationsOn);
    setDefaultAlertBefore(settings.defaultAlertBefore);
    setUseBrowserNotifications(settings.useBrowserNotifications);

    localStorage.setItem("appSettings", JSON.stringify(settings));

    setIsSaving(false);
    toast("Settings saved successfully!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    onClose();
  };

  const handleReset = () => {
    const defaultTheme = "default";
    const defaultBgImg = "";

    setBgImg(defaultBgImg);
    setTheme(defaultTheme);

    document.body.style.backgroundImage = "";
    document.body.setAttribute("data-theme", defaultTheme);

    localStorage.removeItem("bgImg");
    localStorage.removeItem("appSettings");

    toast("Settings reset to default values.", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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

  const renderNotificationSettings = () => (
    <div className={styles.content}>
      <h2>Notification Settings</h2>
      <div className={styles.timerSetting}>
        <label htmlFor="isDueDateNotificationsOn">Enable Due Date Notifications:</label>
        <div className={styles.toggleSwitch}>
          <input
            type="checkbox"
            id="isDueDateNotificationsOn"
            checked={isDueDateNotificationsOn}
            onChange={(e) => setIsDueDateNotificationsOn(e.target.checked)}
            className={styles.toggleInput}
          />
          <label htmlFor="isDueDateNotificationsOn" className={styles.toggleLabel}></label>
        </div>
      </div>

      <div className={styles.timerSetting}>
        <label htmlFor="defaultAlertBefore">Default Alert Timing:</label>
        <CustomSelectDropdown
          id="defaultAlertBefore"
          name="defaultAlertBefore"
          value={String(defaultAlertBefore)}
          onChange={(e) => setDefaultAlertBefore(Number(e.target.value))}
          disabled={!isDueDateNotificationsOn}
          options={[
            { value: "5", label: "5 minutes before" },
            { value: "10", label: "10 minutes before" },
            { value: "15", label: "15 minutes before" },
            { value: "30", label: "30 minutes before" },
            { value: "60", label: "1 hour before" },
          ]}
        />
      </div>

      <div className={styles.timerSetting}>
        <label htmlFor="useBrowserNotifications">Browser Notifications:</label>
        <div className={styles.toggleSwitch}>
          <input
            type="checkbox"
            id="useBrowserNotifications"
            checked={useBrowserNotifications}
            onChange={async (e) => {
              if (e.target.checked && "Notification" in window) {
                const permission = await Notification.requestPermission();
                setUseBrowserNotifications(permission === "granted");
              } else {
                setUseBrowserNotifications(false);
              }
            }}
            className={styles.toggleInput}
          />
          <label htmlFor="useBrowserNotifications" className={styles.toggleLabel}></label>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            const current = localStorage.getItem("appSettings");
            if (current) {
              const parsed = JSON.parse(current);
              const updated = {
                ...parsed,
                isDueDateNotificationsOn,
                defaultAlertBefore,
                useBrowserNotifications,
              };
              localStorage.setItem("appSettings", JSON.stringify(updated));
              Toast("Notification settings saved!");
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );

  const renderGeneralSettings = () => (
    <div className={styles.content}>
      <h2>General Settings</h2>
      <form method="post" onSubmit={handleSaveGeneralSettings}>
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
          <CustomTextInput
            type="url"
            name="bgImg"
            value={bgImg}
            onChange={(e) => setBgImg(e.target.value)}
            placeholder="Enter image URL"
            onClear={clearWebImageUrl}
          />
        </div>

        <div className={styles.timerSetting}>
          <label htmlFor="themeSelector">Theme:</label>
          <CustomThemeSelector
            selectedTheme={theme}
            onChangeTheme={handleThemeChange}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button}>
            {isSaving ? (
              <>
                <span>Saving...</span>
                <span className={styles.spinner}></span>{" "}
              </>
            ) : (
              "Save"
            )}
          </button>
          <button onClick={handleReset} className={styles.button}>
            Reset
          </button>
          <button onClick={handleCancel} className={styles.button}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

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
            <MenuItem
              isActive={activePanel === "settings"}
              text="General"
              IconComponent={SettingsButton}
              onClick={() => setActivePanel("settings")}
            />
            <MenuItem
              isActive={activePanel === "timerSetting"}
              text="Timer"
              IconComponent={TimerButton}
              onClick={() => setActivePanel("timerSetting")}
            />
            <MenuItem
              isActive={activePanel === "notifications"}
              text="Notifications"
              IconComponent={TimerButton}
              onClick={() => setActivePanel("notifications")}
            />
            <MenuItem
              isActive={activePanel === "importExport"}
              text="Transfer Tasklist"
              IconComponent={ExportImportButton}
              onClick={() => setActivePanel("importExport")}
            />
            <MenuItem
              isActive={activePanel === "shareStream"}
              text="Share Stream"
              IconComponent={ShareStreamButton}
              onClick={() => setActivePanel("shareStream")}
            />
            <MenuItem
              isActive={activePanel === "journal"}
              text="Journal"
              IconComponent={JournalButton}
              onClick={() => setActivePanel("journal")}
            />
            <MenuItem
              isActive={activePanel === "storedFiles"}
              text="Stored Files"
              IconComponent={StoredFilesButton}
              onClick={() => setActivePanel("storedFiles")}
            />
          </ul>
        </aside>
        {activePanel === "settings" && renderGeneralSettings()}
        {activePanel === "timerSetting" && (
          <TimerSettings
            count={count}
            timerStatus={timerStatus}
            breakDuration={breakDuration}
            isAlertOn={isAlertOn}
            isAutoSwitchOn={isAutoSwitchOn}
            setCount={setCount}
            setBreakDuration={setBreakDuration}
            setIsAlertOn={setIsAlertOn}
            setAutoSwitchOn={setAutoSwitchOn}
          />
        )}
        {activePanel === "importExport" && (
          <ImportExportTasks onClose={onClose} importTasks={importTasks} />
        )}
        {activePanel === "shareStream" && <ShareStream />}
        {activePanel === "journal" && <Journal onClose={onClose} />}
        {activePanel === "storedFiles" && <StoredFiles />}
        {activePanel === "notifications" && renderNotificationSettings()}
      </div>
    </div>
  );
};

export default Settings;
