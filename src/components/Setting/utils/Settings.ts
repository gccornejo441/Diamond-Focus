import { TaskListProps } from "../../Sidebar/types/SidebarTypes";
import { SettingsProps } from "../types/SettingTypes";

const defaultSettings: SettingsProps = {
  count: 1500,
  breakDuration: 300,
  isAlertOn: true,
  isAutoSwitchOn: false,
  theme: "default",
  bgImg: "",
  alarmName: "sciFiAlarm.mp3",
  isNewTaskOnTop: true,
};

const defaultTaskList: TaskListProps = {
  id: 0,
  title: "New List",
  taskSelected: true,
  tasks: [],
};

/**
 * Initializes default settings in local storage if they do not already exist.
 *
 * IMPORTANT: `localStorage.setItem(key, JSON.stringify(defaultSettings));` IS
 * SET HERE.
 *
 * @param {string} key - The key used to store the settings in local storage.
 * @return {any | null} The parsed settings object if successful, otherwise null.
 *
 */
function initializeDefaultSettings(key: string): void {
  try {
    const settings = localStorage.getItem(key);
    if (!settings) {
      localStorage.setItem(key, JSON.stringify(defaultSettings));
    }
  } catch (e) {
    console.error(`Error initializing default settings for ${key}:`, e);
  }
}

/**
 * Retrieves and parses settings from local storage based on the provided key.
 *
 * @param {string} key - The key used to retrieve the settings from local storage.
 * @return {any | null} The parsed settings object if successful, otherwise null.
 */
function getParsedSettings(key: string): SettingsProps | null {
  try {
    const settings = localStorage.getItem(key);
    return settings ? JSON.parse(settings) : null;
  } catch (e) {
    console.error(`Error parsing settings from ${key}:`, e);
    return null;
  }
}

/**
 * Initializes default task list in local storage if it does not already exist.
 *
 * @param {string} key - The key used to store the task list in local storage.
 * @return {any | null} The parsed task list object if successful, otherwise null.
 */
function initializeDefaultTaskList(key: string): void {
  try {
    const taskList = localStorage.getItem(key);
    if (!taskList) {
      localStorage.setItem(key, JSON.stringify([defaultTaskList]));
    }
  } catch (e) {
    console.error(`Error initializing default task list for ${key}:`, e);
  }
}

/**
 * Retrieves and parses task list from local storage based on the provided key.
 *
 * @param {string} key - The key used to retrieve the task list from local storage.
 * @return {any | null} The parsed task list object if successful, otherwise null.
 */
function getParsedTaskList(key: string): TaskListProps | null {
  try {
    const taskList = localStorage.getItem(key);
    return taskList ? JSON.parse(taskList) : null;
  } catch (e) {
    console.error(`Error parsing task list from ${key}:`, e);
    return null;
  }
}

/**
 * Generates a Settings object based on the provided FormData.
 *
 * @param {FormData} formData - The FormData containing the settings data.
 * @return {SettingsProps} The generated Settings object.
 */
function settingFormHelper(formData: FormData): SettingsProps {
  return {
    count: parseInt(formData.get("focusTimer") as string) * 60,
    breakDuration: parseInt(formData.get("breakTimer") as string) * 60,
    isAlertOn: formData.has("alarmMuter"),
    isAutoSwitchOn: formData.has("autoSwitch"),
    theme: formData.get("theme") as string,
    bgImg: formData.get("bgImg") as string,
    alarmName: formData.get("alarmName") as string,
    isNewTaskOnTop: formData.has("newTasksOnTop"),
  };
}

export {
  initializeDefaultSettings,
  getParsedSettings,
  initializeDefaultTaskList,
  getParsedTaskList,
  settingFormHelper,
  defaultSettings,
  defaultTaskList,
};
