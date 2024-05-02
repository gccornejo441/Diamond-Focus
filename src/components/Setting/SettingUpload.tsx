import styles from './Setting.module.css';

interface SettingUploadProps {
    setBgImg: React.Dispatch<React.SetStateAction<string>>;
}

const SettingUpload = ({ setBgImg }: SettingUploadProps) => {

    return (
        <div className={styles.main}>
            <div className={styles.settingCardItemTitle}>Background Image Link</div>
            <div className={`${styles.inputWrapper} notion-focusable-within`}>
                <input
                    name='bgImg'
                    id='bgImg'
                    className={styles.bgInput}
                    onChange={(e) => setBgImg(e.target.value)}
                    placeholder="Paste an image link…"
                    type="url"
                />
            </div>
        </div>
    )
}

export default SettingUpload;