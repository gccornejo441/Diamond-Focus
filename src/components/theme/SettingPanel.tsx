import { useEffect } from 'react';
import styles from './Setting.module.css'

const SettingPanel = () => {
    const changeTheme = (themeName: string) => {
        document.body.setAttribute('data-theme', themeName);
        localStorage.setItem('theme', themeName);
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
        }
    }, []);

    return (
        <div className={`${styles.card} ${styles.centeredText} ${styles.inheritedStylesForExportedElement}`}>
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
            {/* <div className={styles.cardText}>
                <p className={`${styles.cardTitle} ${styles.bigger}`}>Background</p>
            </div> */}
        </div>
    )
}

export default SettingPanel;


