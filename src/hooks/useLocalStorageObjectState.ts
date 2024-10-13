import { useState, useEffect } from "react";

const useLocalStorageObjectState = <T>(
  storageKey: string,
  propertyKey: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [propertyValue, setPropertyValue] = useState<T>(() => {
    const storedSettings = localStorage.getItem(storageKey);
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      return parsedSettings[propertyKey] !== undefined
        ? parsedSettings[propertyKey]
        : defaultValue;
    }
    return defaultValue;
  });

  useEffect(() => {
    const storedSettings = localStorage.getItem(storageKey);
    const settings = storedSettings ? JSON.parse(storedSettings) : {};

    settings[propertyKey] = propertyValue;

    localStorage.setItem(storageKey, JSON.stringify(settings));
  }, [propertyValue, propertyKey, storageKey]);

  return [propertyValue, setPropertyValue] as const;
};

export default useLocalStorageObjectState;
