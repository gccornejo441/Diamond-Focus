import React from 'react';
import styles from './Setting.module.css';

interface ThemeSelectorProps {
  selectedTheme: string;
  onChangeTheme: (theme: string) => void;
}

const themes = [
  { name: 'Dark', value: 'dark', color: 'var(--gray-900)' },
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
];

const ThemeSelector = ({ selectedTheme, onChangeTheme }: ThemeSelectorProps) => {
  
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTheme(e.target.value);
  };

  return (
    <div className={styles.cardIllustration}>
      <ul className={styles.colorPalette}>
        {themes.map(theme => (
          <li key={theme.value}>
            <label style={{ backgroundColor: theme.color }}>
              <input
                type="radio"
                name="theme"
                value={theme.value}
                onChange={handleThemeChange}
                checked={selectedTheme === theme.value}
              />
              {theme.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThemeSelector;
