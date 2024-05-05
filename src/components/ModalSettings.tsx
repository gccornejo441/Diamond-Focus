import React, { useState } from 'react';
import styles from './ModalSettings.module.css';
import SettingUpload from './Setting/SettingUpload';
export const SettingIcon = ({ cls = styles.settingsIcon }) => (
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

const ModalSettings = () => {
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [alarmSound, setAlarmSound] = useState('SciFi Alert');
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <a className={styles.modalClose} aria-label="Close">
          {/* SVG Close Icon */}
          <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className={styles.icon}>
            <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </a>
        <aside className={styles.sidebar}>
          <header>
            <h1 className={styles.title}>Settings</h1>
          </header>
          <ul className={styles.menu}>
            <li className={styles.activeMenuItem}>
              <a className={styles.menuLink}>
                <SettingIcon />
                <strong>General</strong>
              </a>
            </li>
          </ul>
        </aside>

        <div className={styles.content}>
          <h2>General Settings</h2>
          <div className={styles.timerSettings}>
            <div className={styles.timerSetting}>
              <label htmlFor="focusTimer">Focus Time (minutes):</label>
              <input
                type="number"
                id="focusTimer"
                value={focusTime}
                onChange={e => setFocusTime(Number(e.target.value))}
                className={styles.timerInput}
              />
            </div>
            <div className={styles.timerSetting}>
              <label htmlFor="breakTimer">Break Time (minutes):</label>
              <input
                type="number"
                id="breakTimer"
                value={breakTime}
                onChange={e => setBreakTime(Number(e.target.value))}
                className={styles.timerInput}
              />
            </div>
          </div>
          <SettingUpload setBgImg={setBackgroundImage} bgImg={backgroundImage} />
          <div className={styles.timerSetting}>
            <label htmlFor="autoSwitch">Auto-Switch on Completion:</label>
            <div className={styles.toggleSwitch}>
              <input
                type="checkbox"
                id="autoSwitch"
                checked={autoSwitch}
                onChange={() => setAutoSwitch(!autoSwitch)}
                className={styles.toggleInput}
              />
              <label htmlFor="autoSwitch" className={styles.toggleLabel}></label>
            </div>
          </div>

          <div className={styles.timerSetting}>
          <label htmlFor="alarmToggle">Enable Alarm:</label>
            <div className={styles.toggleSwitch}>
              <input
                type="checkbox"
                id="alarmToggle"
                checked={alarmEnabled}
                onChange={() => setAlarmEnabled(!alarmEnabled)}
                className={styles.toggleInput}
              />
              <label htmlFor="alarmToggle" className={styles.toggleLabel}></label>
            </div>
          </div>
          <div className={styles.settingItem}>
            <label htmlFor="alarmSound">Alarm Sound:</label>
            <select
              id="alarmSound"
              value={alarmSound}
              onChange={e => setAlarmSound(e.target.value)}
              className={styles.selectInput}
              disabled={!alarmEnabled}
            >
              <option value="SciFi Alert">SciFi Alert</option>
            </select>
          </div>
        <div className={styles.gridContainer}>
          <div className={styles.flexColumn}>
            <label className={styles.label} htmlFor="toggle_radix_theme">
              Accent color
            </label>
            <div className={styles.descriptionText}>
              Choosing an accent color may override any theme you have selected.
            </div>
          </div>
          <div className={styles.flexItemCenter}>
            <div className={styles.accentColorListWrap}>
              
              <div className={styles.colorButtonWrap}>
                <button className={styles.uiButton} style={{ backgroundColor: "red" }}>
                  <strong className={styles.colorIndicator} style={{ backgroundColor: "red" }}></strong>
                </button>
              </div>

            </div>
          </div>
        </div>
        </div>

      </div>
    </div>
  );
};

export default ModalSettings;
