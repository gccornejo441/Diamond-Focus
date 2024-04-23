import React, { useState, useEffect } from 'react';
import styles from './Setting.module.css';
import { ReactComponent as CancelButton } from '../assets/cancelButton.svg';

interface SettingPanelProps {
    onClose: () => void;
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}

const CountDownSetting = ({ onClose, count, setCount }: SettingPanelProps) => {
    const [tempCount, setTempCount] = useState(Math.floor(count / 60));

    useEffect(() => {
        const storedCount = localStorage.getItem('count');
        if (storedCount) {
            setTempCount(Math.floor(parseInt(storedCount) / 60));
        } else {
            setTempCount(Math.floor(count / 60));
        }
    }, [count]);

    const saveSettings = () => {
        setCount(tempCount * 60);
        localStorage.setItem('count', (tempCount * 60).toString());
        onClose(); 
    };

    const resetSettings = () => {
        const defaultCount = 25;
        setCount(defaultCount * 60);
        setTempCount(defaultCount);
        localStorage.setItem('count', (defaultCount * 60).toString()); 
        onClose();
    };

    return (
        <div className={styles.cardMain}>
            <div className={styles.settingCard}>
                <CancelButton className={styles.cancelButton} onClick={onClose} />
                <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>Timer Settings</div>
                    <div className={styles.settingCardBody}>
                        <div className={styles.settingCardItem}>
                            <label className={styles.settingCardItemTitle}>Time (minutes)</label>
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
