import { SettingsProps } from '../types/SettingTypes';

export const defaultSettings: SettingsProps = {
    count: 1500,
    breakDuration: 300,
    isAlertOn: true,
    isAutoSwitchOn: false,
    theme: 'dark',
    bgImg: '',
    alarmSoundName: 'sciFiAlarm.mp3',
    isNewTaskOnTop: true,
};

/**
 * Initializes default settings in local storage if they do not already exist.
 *
 * @param {string} key - The key used to store the settings in local storage.
 */
export function initializeDefaultSettings(key: string) {
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
export function getParsedSettings(key: string) : SettingsProps | null {
    try {
        const settings = localStorage.getItem(key);
        return settings ? JSON.parse(settings) : null;
    } catch (e) {
        console.error(`Error parsing settings from ${key}:`, e);
        return null;
    }
}

/**
 * Generates a Settings object based on the provided FormData.
 *
 * @param {FormData} formData - The FormData containing the settings data.
 * @return {SettingsProps} The generated Settings object.
 */
export function settingFormHelper(formData: FormData): SettingsProps {
    return {
      count: parseInt(formData.get('focusTimer') as string) * 60,
      breakDuration: parseInt(formData.get('breakTimer') as string) * 60,
      isAlertOn: formData.has('alarmMuter'),
      isAutoSwitchOn: formData.has('autoSwitch'),
      theme: formData.get('theme') as string,
      bgImg: formData.get('bgImg') as string,
      alarmSoundName: formData.get('alarmSoundName') as string,
      isNewTaskOnTop: formData.has('newTasksOnTop')
    };
}
