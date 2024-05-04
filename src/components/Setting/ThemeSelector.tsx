import React from 'react';
import styles from './Setting.module.css';
import { Tooltip } from 'react-tooltip';

interface ThemeSelectorProps {
  selectedTheme: string;
  onChangeTheme: (theme: string) => void;
}

const themes = [
  { name: 'Default', value: 'default', color: 'var(--b4)' },
  { name: 'Indigo', value: 'indigo-theme', color: 'var(--indigo-100)' },
  { name: 'Blue', value: 'blue-theme', color: 'var(--blue-100)' },
  { name: 'Pink', value: 'pink-theme', color: 'var(--pink-100)' },
  { name: 'Red', value: 'red-theme', color: 'var(--red-100)' },
  { name: 'Green', value: 'green-theme', color: 'var(--green-100)' },
  { name: 'Brown', value: 'brown-theme', color: 'var(--brown-100)' },
  { name: 'Orange', value: 'orange-theme', color: 'var(--orange-100)' },
  { name: 'Purple', value: 'purple-theme', color: 'var(--purple-100)' },
  { name: 'Deep Orange', value: 'deep-orange-theme', color: 'var(--deep-orange-100)' },
  { name: 'Teal', value: 'teal-theme', color: 'var(--teal-100)' },
  { name: 'Grey', value: 'grey-theme', color: 'var(--grey-100)' },
  { name: 'Dark', value: 'dark', color: 'var(--grey-900)' },
  { name: 'High Contrast', value: 'high-contrast', color: 'black' },
];

const ThemeSelector = ({ selectedTheme, onChangeTheme }: ThemeSelectorProps) => {

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTheme(e.target.value);
  };

  return (
    <div className={styles.settingCardItem}>
      <div className={styles.settingCardItemTitle}>Theme</div>
      <div className={styles.cardIllustration}>
        <ul className={styles.colorPalette}>
          {themes.map(theme => (
            <li
              data-tooltip-id="themeTooltip"
              data-tooltip-place='bottom'
              data-tooltip-content={theme.name} className={styles.colorItem} key={theme.value}>
              <label htmlFor={theme.name} className={styles.colorLabel} style={{ backgroundColor: theme.color, border: selectedTheme === theme.value ? '2px solid white' : '1px solid white', transition: 'border 0.5s ease' }}>
                <input
                  type="radio"
                  name="theme"
                  id={theme.name}
                  value={theme.value}
                  onChange={handleThemeChange}
                  checked={selectedTheme === theme.value}
                />
              </label>
            </li>
          ))}
        </ul>
        <Tooltip className='themeTooltipStyles' id="themeTooltip" />
      </div>
    </div>
  );
}

export default ThemeSelector;
