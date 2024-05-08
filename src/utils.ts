/**
 * Formats the given number of seconds into a string in the format "minutes:seconds".
 *
 * @param {number} seconds - The number of seconds to format.
 * @return {string} The formatted time string.
 */
export const TimePadder = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds.toString();
  return `${minutes}:${formattedSeconds}`;
};

/**
 * Applies styles to the body element based on the provided background image and theme.
 *
 * @param {string} bgImg - The URL of the background image. If null or empty, the background image is removed.
 * @param {string} theme - The theme to apply to the body element. If null or empty, the theme is removed.
 */
export const ApplyBodyStyles = (bgImg: string, theme: string) => {
  const existingOverlay = document.getElementById('background-overlay');

  if (bgImg) {
      if (!existingOverlay) {
          const overlay = document.createElement('div');
          overlay.id = 'background-overlay';
          overlay.style.position = 'fixed';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
          overlay.style.zIndex = '-1'; 
          document.body.appendChild(overlay);
      }

      document.body.style.backgroundImage = `url('${bgImg}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backdropFilter = 'brightness(1)';

      if (existingOverlay) {
          existingOverlay.style.display = 'block';
      }
  } else {
      document.body.style.background = '';
      if (existingOverlay) {
          existingOverlay.style.display = 'none';
      }
  }

  if (theme) {
      document.body.setAttribute('data-theme', theme);
  } else {
      document.body.removeAttribute('data-theme');
  }
};


/**
 * Retrieves and parses settings from local storage based on the provided key.
 *
 * @param {string} key - The key used to retrieve the settings from local storage.
 * @return {any | null} The parsed settings object if successful, otherwise null.
 */
export function getParsedSettings(key: string) {
    try {
        const settings = localStorage.getItem(key);
        return settings ? JSON.parse(settings) : null;
    } catch (e) {
        console.error(`Error parsing settings from ${key}:`, e);
        return null;
    }
}

export interface Settings {
    count: number;
    breakDuration: number;
    isAlertOn: boolean;
    isAutoSwitchOn: boolean;
    theme: string;
    bgImg: string;
    alarmSoundName: string;
    isNewTaskOnTop: boolean;
  }
  
/**
 * Generates a Settings object based on the provided FormData.
 *
 * @param {FormData} formData - The FormData containing the settings data.
 * @return {Settings} The generated Settings object.
 */
export function settingFormHelper(formData: FormData): Settings {
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