import React, { useState, useEffect } from 'react';
import styles from './Setting.module.css';
import { ReactComponent as CancelButton } from '../assets/cancelButton.svg';
import SettingUpload from './SettingUpload';
import ThemeSelector from './ThemeSelector';

interface SettingPanelProps {
    onClose: () => void;
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    breakDuration: number;
    setBreakDuration: React.Dispatch<React.SetStateAction<number>>;
    isAlertOn: boolean;
    setIsAlertOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const applyBodyStyles = (bgImg: string, theme: string) => {
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
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            overlay.style.zIndex = '-1'; 
            document.body.appendChild(overlay);
        }

        document.body.style.backgroundImage = `url('${bgImg}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backdropFilter = 'brightness(0.8)';

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

const Setting = ({ onClose, count, setCount, breakDuration, setBreakDuration, isAlertOn, setIsAlertOn }: SettingPanelProps) => {
    const [tempCount, setTempCount] = useState<number>(0);
    const [tempBreak, setTempBreak] = useState<number>(0);
    const [alertName, setAlertName] = useState<string>('');
    const [bgImg, setBgImg] = useState<string>('');
    const [theme, setTheme] = useState('default');  // Default theme

    useEffect(() => {
        setIsAlertOn(localStorage.getItem('isAlertOn') === 'true' ? true : false);
        setTempCount(Math.floor(parseInt(localStorage.getItem('count') || String(count)) / 60));
        setTempBreak(Math.floor(parseInt(localStorage.getItem('breakDuration') || String(breakDuration)) / 60));
        const savedBgImg = localStorage.getItem('bgImg') || '';
        setBgImg(savedBgImg);
        if (savedBgImg) {
            document.body.style.backgroundImage = `url('${savedBgImg}')`;
        }
    }, [count, breakDuration]);

    const saveSettings = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newCount = formData.get('count') as string;
        const newBreakDuration = formData.get('break') as string;
        const newIsAlertOn = formData.has('isAlertOn');
        const newTheme = formData.get('theme') as string;
        const newBgImg = formData.get('bgImg') as string;

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

        applyBodyStyles(newBgImg, newTheme);

        if (newBgImg) {
            localStorage.setItem('bgImg', newBgImg);
        } else {
            localStorage.removeItem('bgImg');
        }
    
        if (newTheme) {
            localStorage.setItem('theme', newTheme);
        } else {
            localStorage.removeItem('theme');
        }

        onClose();
    };

    const handleThemeChange = (themeName: string) => {
        setTheme(themeName);
    }


    const resetSettings = () => {
        const defaultCount = 1500;
        const defaultBreak = 300;
        const defaultAlert = true;
        const defaultTheme = 'default';

        setCount(defaultCount);
        setBreakDuration(defaultBreak);
        setIsAlertOn(defaultAlert);
        setBgImg('');
        document.body.style.backgroundImage = '';
        document.body.setAttribute('data-theme', defaultTheme);

        localStorage.setItem('count', (defaultCount).toString());
        localStorage.setItem('breakDuration', (defaultBreak).toString());
        localStorage.setItem('isAlertOn', String(defaultAlert));
        localStorage.setItem('theme', defaultTheme);
        localStorage.removeItem('bgImg');
        onClose();
    };

    return (
        <div className={styles.cardMain}>
            <form method="post" onSubmit={saveSettings}>
                <div className={styles.settingCard}>
                    <CancelButton className={styles.cancelButton} onClick={onClose} />
                    <div className={styles.cardHeader}>
                        <legend className={styles.cardTitle}>Theme Settings</legend>
                        <div className={styles.settingCardBody}>
                            <div>
                                <div className={styles.settingTimeBlock}>
                                    <div className={styles.settingCardItem}>
                                        <label htmlFor="timerInput" className={styles.settingCardItemTitle}>Timer (minutes)</label>
                                        <input
                                            id="timerInput"
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
                                        <label htmlFor="breakInput" className={styles.settingCardItemTitle}>Break (minutes)</label>
                                        <input
                                            id="breakInput"
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
                                        <label htmlFor="notificationSelect" className={styles.settingCardItemTitle}>Notification</label>
                                        <select
                                            id="notificationSelect"
                                            className={styles.settingSelect}
                                            name="notification"
                                            onChange={e => setAlertName(e.target.value)} >
                                            <option value="1">SciFi Alert</option>
                                        </select>
                                    </div>
                                    <div className={styles.settingCardItem}>
                                        <label htmlFor="soundToggle" className={styles.settingCardItemTitle}>Sound</label>
                                        <div className={styles.checkboxWrapper2}>
                                            <input
                                                id="soundToggle"
                                                onChange={e => setIsAlertOn(e.target.checked)}
                                                type="checkbox"
                                                name="isAlertOn"
                                                checked={isAlertOn}
                                                className={styles.linearToggle}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.settingCardItem}>
                                    <div className={styles.settingCardItemTitle}>Theme</div>
                                    <ThemeSelector selectedTheme={theme} onChangeTheme={handleThemeChange} />
                                </div>
                                <SettingUpload setBgImg={setBgImg} />
                                <div className={styles.settingCardCommitBtn}>
                                    <button type="submit" className={styles.settingButton}>Save</button>
                                    <button type="button" onClick={resetSettings} className={styles.settingButton}>Reset</button>
                                    <button type="button" onClick={onClose} className={styles.settingButton}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default Setting;
