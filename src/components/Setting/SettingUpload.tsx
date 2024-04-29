import styles from './SettingUpload.module.css';

interface SettingUploadProps {
    setBgImg: React.Dispatch<React.SetStateAction<string>>;
}

const SettingUpload = ({ setBgImg }: SettingUploadProps) => {

    return (
        <div className={styles.main}>
            <div className={styles.settingCardItemTitle}>Theme</div>
            <div className={`${styles.inputWrapper} notion-focusable-within`}>
                <input
                    className={styles.input}
                    onChange={(e) => setBgImg(e.target.value)}
                    placeholder="Paste an image link…"
                    type="url"
                />
            </div>
        </div>
    )
}

export default SettingUpload;