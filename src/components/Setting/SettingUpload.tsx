import styles from './SettingUpload.module.css';
const SettingUpload = () => {

    return (
        <div className={styles.main}>
            <div className={styles.settingCardItemTitle}>Theme</div>
            <div className={`${styles.inputWrapper} notion-focusable-within`}>
                <input
                    className={styles.input}
                    placeholder="Paste an image link…"
                    type="url"
                />
            </div>
        </div>
    )
}

export default SettingUpload;