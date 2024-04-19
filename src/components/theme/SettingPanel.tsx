import React, { useEffect, useState } from 'react';
import styles from './Setting.module.css'
import { ReactComponent as CancelButton } from '../assets/cancelButton.svg';

interface SettingPanelProps {
    onClose: () => void;
    pomodoroTime: number;
    setPomodoroTime: React.Dispatch<React.SetStateAction<number>>;
    breakTime: number;
    setBreakTime: React.Dispatch<React.SetStateAction<number>>;
}

const SettingPanel = ({ onClose, pomodoroTime, setPomodoroTime, breakTime, setBreakTime }: SettingPanelProps) => {
    const [tempPomodoroTime, setTempPomodoroTime] = useState(pomodoroTime);
    const [tempBreakTime, setTempBreakTime] = useState(breakTime);

    const saveSettings = () => {
        setPomodoroTime(tempPomodoroTime);
        setBreakTime(tempBreakTime);
        localStorage.setItem('pomodoroTime', tempPomodoroTime.toString());
        localStorage.setItem('breakTime', tempBreakTime.toString());
        onClose();
    };

    const changeTheme = (themeName: string) => {
        document.body.setAttribute('data-theme', themeName);
        localStorage.setItem('theme', themeName);
    };

    const resetSettings = () => {
        const defaultPomodoroTime = 25;
        const defaultBreakTime = 5;
        setPomodoroTime(defaultPomodoroTime);
        setBreakTime(defaultBreakTime);
        setTempPomodoroTime(defaultPomodoroTime);
        setTempBreakTime(defaultBreakTime);
        localStorage.setItem('pomodoroTime', defaultPomodoroTime.toString());
        localStorage.setItem('breakTime', defaultBreakTime.toString());

        changeTheme('default');
        onClose();
    };

    useEffect(() => {

        if (tempPomodoroTime < 1) {
            setTempPomodoroTime(1);
        } else if (tempPomodoroTime > 99) {
            setTempPomodoroTime(99);
        }

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
        }

    }, [tempPomodoroTime]);

    return (
        <div className={styles.cardMain}>
            <div className={styles.settingCard}>
                <CancelButton className={styles.cancelButton} onClick={onClose} />
                <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>App Settings</div>
                    <div className={styles.settingCardBody}>
                        <div className={styles.settingCardItem}>
                            <span className={styles.settingCardItemTitle}>Time (minutes)</span>
                            <input
                                type="number"
                                min="1"
                                step="1"
                                max="99"
                                pattern='[1-9]*'
                                value={tempPomodoroTime}
                                onChange={e => setTempPomodoroTime(Number(e.target.value))}
                            />
                            <span className={styles.settingCardItemTitle}>Break Time (minutes)</span>
                            <input
                                type="number"
                                min="1"
                                step="1"
                                max="99"
                                pattern='[1-9]*'
                                value={tempBreakTime}
                                onChange={e => setTempBreakTime(Number(e.target.value))}
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
                                </ul>
                            </div>
                        </div>
                        <div className={styles.settingCardCommitBtn}>
                            <button onClick={saveSettings} className={styles.saveButton}>Save</button>
                            <button onClick={onClose} className={styles.saveButton}>Cancel</button>
                            <button onClick={resetSettings} className={styles.saveButton}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingPanel;


