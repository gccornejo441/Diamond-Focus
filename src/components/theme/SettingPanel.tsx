import styles from './Setting.module.css'

const SettingPanel = () => {
    const changeTheme = (color: string) => {
        const formattedColor = color.startsWith('--') ? `var(${color})` : color;
        document.documentElement.style.setProperty('--background-color', formattedColor);
    }

    return (
        <div className={styles.settingPanelContainer}>
            <div>
                <button onClick={() => changeTheme('--indigo-800')}>Indigo Dark</button>
                <button onClick={() => changeTheme('#333333')}>Dark</button>
                <button onClick={() => changeTheme('#FFD700')}>Gold</button>
            </div>
        </div>
    )
}

export default SettingPanel;


