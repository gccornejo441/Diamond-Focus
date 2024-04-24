import React, { useState, useEffect } from 'react';
import styles from './Setting.module.css';
import { ReactComponent as CancelButton } from '../assets/cancelButton.svg';

interface SettingPanelProps {
    onClose: () => void;
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    breakDuration: number;
    setBreakDuration: React.Dispatch<React.SetStateAction<number>>;
}

const CountDownSetting = ({ onClose, count, setCount, breakDuration, setBreakDuration }: SettingPanelProps) => {
    const [tempCount, setTempCount] = useState<number>(0);
    const [tempBreak, setTempBreak] = useState<number>(0);

    useEffect(() => {
        setTempCount(Math.floor(parseInt(localStorage.getItem('count') || String(count)) / 60));
        setTempBreak(Math.floor(parseInt(localStorage.getItem('breakDuration') || String(breakDuration)) / 60));
    }, [count, breakDuration]);

    const saveSettings = () => {
        setCount(tempCount * 60);
        setBreakDuration(tempBreak * 60);
        localStorage.setItem('count', (tempCount * 60).toString());
        localStorage.setItem('breakDuration', (tempBreak * 60).toString());
        onClose();
    };

    const resetSettings = () => {
        const defaultCount = 25;
        const defaultBreak = 5;
        setTempCount(defaultCount);
        setTempBreak(defaultBreak);
        localStorage.setItem('count', (defaultCount * 60).toString());
        localStorage.setItem('breakDuration', (defaultBreak * 60).toString());
        onClose();
    };

    const changeTheme = (themeName: string) => {
        document.body.setAttribute('data-theme', themeName);
        localStorage.setItem('theme', themeName);
    };

    return (<div className={styles.cardMain}>
        <div className={styles.settingCard}>
            <CancelButton className={styles.cancelButton} onClick={onClose} />
            <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Settings</div>
                <div className={styles.settingCardBody}>
                    <div className={styles.settingCardItem}>
                        <label className={styles.settingCardItemTitle}>Timer (minutes)</label>
                        <input
                            type="number"
                            className={styles.input}
                            min="1"
                            max="60"
                            step="1"
                            value={tempCount}
                            onChange={e => setTempCount(Math.max(1, Math.min(60, parseInt(e.target.value))))}
                        />
                    </div>
                    <div className={styles.settingCardItem}>
                        <label className={styles.settingCardItemTitle}>Break (minutes)</label>
                        <input
                            type="number"
                            className={styles.input}
                            min="1"
                            max="60"
                            step="1"
                            value={tempBreak}
                            onChange={e => setTempBreak(Math.max(1, Math.min(60, parseInt(e.target.value))))}
                        />
                    </div>
                    <div className={styles.settingCardItem}>
                            <div className={styles.settingCardItemTitle}>Theme</div>
                            <div className={styles.cardIllustration}>
                                <ul className={styles.colorPalette}>
                                    <li onClick={() => changeTheme('light')} style={{ backgroundColor: 'var(--blue-200)' }}></li>
                                    <li onClick={() => changeTheme('dark')} style={{ backgroundColor: 'var(--gray-900)' }}></li>
                                    <li onClick={() => changeTheme('red-theme')} style={{ backgroundColor: 'var(--red-100)' }}></li>
                                    <li onClick={() => changeTheme('green-theme')} style={{ backgroundColor: 'var(--green-100)' }}></li>
                                    <li onClick={() => changeTheme('indigo-theme')} style={{ backgroundColor: 'var(--indigo-100)' }}></li>
                                    <li onClick={() => changeTheme('deep-orange-theme')} style={{ backgroundColor: 'var(--deep-orange-100)' }}></li>
                                    <li onClick={() => changeTheme('teal-theme')} style={{ backgroundColor: 'var(--teal-100)' }}></li>
                                </ul>
                            </div>
                        </div>
                    <div className={styles.settingCardCommitBtn}>
                        <button onClick={saveSettings} className={styles.saveButton}>Save</button>
                        <button onClick={resetSettings} className={styles.saveButton}>Reset</button>
                        <button onClick={onClose} className={styles.saveButton}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default CountDownSetting;
