import { useEffect, useState } from 'react';
import styles from './Setting.module.css'
import { ReactComponent as CancelButton } from '../assets/cancelButton.svg';

interface SettingPanelProps {
    onClose: () => void;
}

const SettingPanel = ({ onClose }: SettingPanelProps) => {
    const [pomodoroTime, setPomodoroTime] = useState(25);
    const [shortBreakTime, setShortBreakTime] = useState(5);
    const [longBreakTime, setLongBreakTime] = useState(15);

    const changeTheme = (themeName: string) => {
        document.body.setAttribute('data-theme', themeName);
        localStorage.setItem('theme', themeName);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
        }
    }, []);

    return (
        <div className={styles.cardMain}>
            <div className={styles.settingCard}>
                <CancelButton className={styles.cancelButton} onClick={onClose} />
                <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>Settings</div>
                    <div className={styles.settingCardBody}>
                        {/* <div className={styles.settingCardItem}>
                            <span className={styles.settingCardItemTitle}>Time (minutes)</span>
                            <label>Pomodoro</label>
                            <input
                                type="number"
                                min="0"
                                step="1"
                                value={pomodoroTime}
                                onChange={e => setPomodoroTime(Number(e.target.value))}
                            />
                            <label>Short Break</label>
                            <input
                                type="number"
                                min="0"
                                step="1"
                                value={shortBreakTime}
                                onChange={e => setShortBreakTime(Number(e.target.value))}
                            />
                            <label>Long Break</label>
                            <input
                                type="number"
                                min="0"
                                step="1"
                                value={longBreakTime}
                                onChange={e => setLongBreakTime(Number(e.target.value))}
                            />
                        </div> */}
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
                    </div>

                </div>
            </div>

        </div>
    )
}

export default SettingPanel;


