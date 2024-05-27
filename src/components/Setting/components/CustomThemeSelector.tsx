import React from "react";
import { Tooltip } from "react-tooltip";
import styles from "../styles/CustomThemeSelector.module.css";

interface CustomThemeSelectorProps {
  selectedTheme: string;
  onChangeTheme: (theme: string) => void;
}

const themes = [
  {
    name: "Default",
    value: "default",
    color: "var(--b4)",
    focusColor: "var(--b2)",
  },
  {
    name: "Indigo",
    value: "indigo-theme",
    color: "var(--indigo-100)",
    focusColor: "var(--indigo-500)",
  },
  {
    name: "Cyan",
    value: "cyan-theme",
    color: "var(--cyan-100)",
    focusColor: "var(--cyan-500)",
  },
  {
    name: "Blue",
    value: "blue-theme",
    color: "var(--blue-100)",
    focusColor: "var(--blue-500)",
  },
  {
    name: "Pink",
    value: "pink-theme",
    color: "var(--pink-100)",
    focusColor: "var(--pink-500)",
  },
  {
    name: "Red",
    value: "red-theme",
    color: "var(--red-100)",
    focusColor: "var(--red-500)",
  },
  {
    name: "Green",
    value: "green-theme",
    color: "var(--green-100)",
    focusColor: "var(--green-500)",
  },
  {
    name: "Brown",
    value: "brown-theme",
    color: "var(--brown-100)",
    focusColor: "var(--brown-500)",
  },
  {
    name: "Orange",
    value: "orange-theme",
    color: "var(--orange-100)",
    focusColor: "var(--orange-500)",
  },
  {
    name: "Purple",
    value: "purple-theme",
    color: "var(--purple-100)",
    focusColor: "var(--purple-500)",
  },
  {
    name: "Deep Orange",
    value: "deep-orange-theme",
    color: "var(--deep-orange-100)",
    focusColor: "var(--deep-orange-500)",
  },
  {
    name: "Teal",
    value: "teal-theme",
    color: "var(--teal-100)",
    focusColor: "var(--teal-500)",
  },
  {
    name: "Grey",
    value: "grey-theme",
    color: "var(--grey-100)",
    focusColor: "var(--grey-500)",
  },
  {
    name: "Dark",
    value: "dark",
    color: "var(--grey-900)",
    focusColor: "var(--grey-800)",
  },
  {
    name: "High Contrast",
    value: "high-contrast",
    color: "black",
    focusColor: "grey",
  },
  {
    name: "Slate",
    value: "slate-theme",
    color: "var(--slate-100)",
    focusColor: "var(--slate-500)",
  },
  {
    name: "Rose",
    value: "rose-theme",
    color: "var(--rose-100)",
    focusColor: "var(--rose-500)",
  },
  {
    name: "Light",
    value: "light",
    color: "var(--grey-50)",
    focusColor: "var(--grey-100)",
  },
];

const CustomThemeSelector = ({
  selectedTheme,
  onChangeTheme,
}: CustomThemeSelectorProps) => {
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTheme(e.target.value);
  };

  return (
    <div className={styles.settingCardItem}>
      <div className={styles.cardIllustration}>
        <ul className={styles.colorPalette}>
          {themes.map((theme) => (
            <li
              data-tooltip-id="themeTooltip"
              data-tooltip-place="bottom"
              data-tooltip-content={theme.name}
              className={styles.colorItem}
              key={theme.value}
            >
              <label
                htmlFor={theme.name}
                className={styles.colorLabel}
                style={{
                  backgroundColor: theme.color,
                  border:
                    selectedTheme === theme.value
                      ? `3px solid ${theme.focusColor}`
                      : "1px solid white",
                  transition: "border 0.1s ease, transform 0.1s ease",
                }}
              >
                <input
                  type="radio"
                  name="theme"
                  id={theme.name}
                  value={theme.value}
                  onChange={handleThemeChange}
                  checked={selectedTheme === theme.value}
                  style={{ display: "none" }}
                />
              </label>
            </li>
          ))}
        </ul>
        <Tooltip className="themeTooltipStyles" id="themeTooltip" />
      </div>
    </div>
  );
};

export default CustomThemeSelector;
