import React, { useState, useEffect } from 'react';
import styles from './Setting.module.css';
import { ReactComponent as CancelButton } from '../assets/cancelButton.svg';
import SettingUpload from './SettingUpload';

interface SettingPanelProps {
    onClose: () => void;
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    breakDuration: number;
    setBreakDuration: React.Dispatch<React.SetStateAction<number>>;
    isAlertOn: boolean;
    setIsAlertOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Setting = ({ onClose, count, setCount, breakDuration, setBreakDuration, isAlertOn, setIsAlertOn }: SettingPanelProps) => {
    const [tempCount, setTempCount] = useState<number>(0);
    const [tempBreak, setTempBreak] = useState<number>(0);
    const [alertName, setAlertName] = useState<string>('');

    useEffect(() => {
        setIsAlertOn(localStorage.getItem('isAlertOn') === 'true' ? true : false);
        setTempCount(Math.floor(parseInt(localStorage.getItem('count') || String(count)) / 60));
        setTempBreak(Math.floor(parseInt(localStorage.getItem('breakDuration') || String(breakDuration)) / 60));
    }, [count, breakDuration]);

    const saveSettings = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newCount = formData.get('count') as string;
        const newBreakDuration = formData.get('break') as string;
        const newIsAlertOn = formData.has('isAlertOn');

        if (newCount && newBreakDuration) {
            const countInSeconds = parseInt(newCount) * 60;
            const breakInSeconds = parseInt(newBreakDuration) * 60;

            setCount(countInSeconds);
            setBreakDuration(breakInSeconds);

            localStorage.setItem('count', countInSeconds.toString());
            localStorage.setItem('breakDuration', breakInSeconds.toString());
        }

        setIsAlertOn(newIsAlertOn);
        localStorage.setItem('isAlertOn', String(newIsAlertOn));

        onClose();
    };

    const resetSettings = () => {
        const defaultCount = 1500;
        const defaultBreak = 300;
        const defaultAlert = true;
        const defaultTheme = 'default';

        setCount(defaultCount);
        setBreakDuration(defaultBreak);
        setIsAlertOn(defaultAlert);
        document.body.setAttribute('data-theme', defaultTheme);

        localStorage.setItem('count', (defaultCount).toString());
        localStorage.setItem('breakDuration', (defaultBreak).toString());
        localStorage.setItem('isAlertOn', String(defaultAlert));
        localStorage.setItem('theme', defaultTheme);
        onClose();
    };

    const changeTheme = (themeName: string) => {
        document.body.setAttribute('data-theme', themeName);
        localStorage.setItem('theme', themeName);
    };

    return (
        <div className={styles.cardMain}>
            <form method="post" onSubmit={saveSettings}>
                <div className={styles.settingCard}>
                    <CancelButton className={styles.cancelButton} onClick={onClose} />
                    <div className={styles.cardHeader}>
                        <div className={styles.cardTitle}>Theme Settings</div>
                        <div className={styles.settingCardBody}>
                            <div className={styles.settingTimeBlock}>
                                <div className={styles.settingCardItem}>
                                    <label className={styles.settingCardItemTitle}>Timer (minutes)</label>
                                    <input
                                        type="number"
                                        name="count"
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
                                        name="break"
                                        className={styles.input}
                                        min="1"
                                        max="60"
                                        step="1"
                                        value={tempBreak}
                                        onChange={e => setTempBreak(Math.max(1, Math.min(60, parseInt(e.target.value))))}
                                    />
                                </div>
                            </div>
                            <div className={styles.settingTimeBlock}>
                                <div className={styles.settingCardItem}>
                                    <label className={styles.settingCardItemTitle}>Notification</label>
                                    <select
                                        className={styles.settingSelect}
                                        onChange={e => setAlertName(e.target.value)} >
                                        <option value="1">SciFi Alert</option>
                                    </select>
                                </div>
                                <div className={styles.settingCardItem}>
                                    <label className={styles.settingCardItemTitle}>Sound</label>
                                    <div className={styles.checkboxWrapper2}>
                                        <label>
                                            <input
                                                onChange={e => setIsAlertOn(e.target.checked)}
                                                type="checkbox"
                                                name="isAlertOn"
                                                checked={isAlertOn}
                                                className={styles.linearToggle}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.settingCardItem}>
                                <div className={styles.settingCardItemTitle}>Theme</div>
                                <div className={styles.cardIllustration}>
                                    <ul className={styles.colorPalette}>
                                        <li onClick={() => changeTheme('dark')} style={{ backgroundColor: 'var(--gray-900)' }}></li>
                                        <li onClick={() => changeTheme('light')} style={{ backgroundColor: 'var(--b4)' }}></li>
                                        <li onClick={() => changeTheme('indigo-theme')} style={{ backgroundColor: 'var(--indigo-100)' }}></li>
                                        <li onClick={() => changeTheme('blue-theme')} style={{ backgroundColor: 'var(--blue-100)' }}></li>
                                        <li onClick={() => changeTheme('purple-theme')} style={{ backgroundColor: 'var(--purple-100)' }}></li>
                                        <li onClick={() => changeTheme('green-theme')} style={{ backgroundColor: 'var(--green-100)' }}></li>
                                        <li onClick={() => changeTheme('teal-theme')} style={{ backgroundColor: 'var(--teal-100)' }}></li>
                                        <li onClick={() => changeTheme('pink-theme')} style={{ backgroundColor: 'var(--pink-100)' }}></li>
                                        <li onClick={() => changeTheme('red-theme')} style={{ backgroundColor: 'var(--red-100)' }}></li>
                                        <li onClick={() => changeTheme('orange-theme')} style={{ backgroundColor: 'var(--orange-100)' }}></li>
                                        <li onClick={() => changeTheme('deep-orange-theme')} style={{ backgroundColor: 'var(--deep-orange-100)' }}></li>
                                    </ul>
                                </div>
                            </div>
                            {/* <SettingUpload /> */}
                            <div className={styles.settingCardCommitBtn}>
                                <button type="submit" className={styles.settingButton}>Save</button>
                                <button type="button" onClick={resetSettings} className={styles.settingButton}>Reset</button>
                                <button type="button" onClick={onClose} className={styles.settingButton}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default Setting;
