import styles from './Setting.module.css'


const ColorPaletteCard = () => {
    return (
        <div className={`${styles.card} ${styles.centeredText} ${styles.inheritedStylesForExportedElement}`}>
            <div className={styles.cardIllustration}>
                <ul className={styles.colorPaletteDemo}>
                    <li style={{ backgroundColor: '#ffea00' }}></li>
                </ul>
            </div>
            <div className={styles.cardText}>
                <p className={`${styles.cardTitle} ${styles.bigger}`}>Color palette</p>
                <p className={styles.cardDesc}>Check all the colors a website is using. Find the color you like, and click to copy.</p>
            </div>
        </div>
    );
}


const SettingPanel = () => {
    const changeTheme = (color: string) => {
        const formattedColor = color.startsWith('--') ? `var(${color})` : color;
        document.documentElement.style.setProperty('--background-color', formattedColor);
    }

    return (
        <div className={`${styles.card} ${styles.centeredText} ${styles.inheritedStylesForExportedElement}`}>
            <div className={styles.cardIllustration}>
                <ul className={styles.colorPaletteDemo}>
                    <li onClick={() => changeTheme('--indigo-500')} style={{ backgroundColor: '#283593' }}></li>
                    <li onClick={() => changeTheme('--blue-500')} style={{ backgroundColor: '#2196f3' }}></li>
                    <li onClick={() => changeTheme('--light-blue-500')} style={{ backgroundColor: '#03a9f4' }}></li>
                    <li onClick={() => changeTheme('--indigo-800')} style={{ backgroundColor: '#283593' }}></li>
                    <li onClick={() => changeTheme('--cyan-300')} style={{ backgroundColor: '#4dd0e1' }}></li>
                    <li onClick={() => changeTheme('--green-300')} style={{ backgroundColor: '#81c784' }}></li>
                </ul>
            </div>
            <div className={styles.cardText}>
                <p className={`${styles.cardTitle} ${styles.bigger}`}>Background</p>
            </div>
        </div>
    )
}

export default SettingPanel;


