import styles from './Setting.module.css';
import { ReactComponent as UndoButton } from '../assets/undoIcon.svg';

interface SettingUploadProps {
    setBgImg: React.Dispatch<React.SetStateAction<string>>;
    bgImg: string;
}

const SettingUpload = ({ setBgImg, bgImg }: SettingUploadProps) => {
    const handleClearInput = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setBgImg('');
    }

    return (
        <div className={styles.settingCardItem}>
            <div className={styles.settingCardItemTitle}>Background Image Link</div>
            <div className={styles.inputWrapper}>
                <input
                    name='bgImg'
                    id='bgImg'
                    value={bgImg}
                    className={styles.bgInput}
                    onChange={(e) => setBgImg(e.target.value)}
                    placeholder="Paste an image link…"
                    type="url"
                />
                <button
                    className="controlButton"
                    onClick={handleClearInput}
                    aria-label="Clear background image"
                >
                    <UndoButton style={{ width: '20px', height: '20px' }} aria-label="Clear background image" />     
                </button>
            </div>
        </div>
    )
}

export default SettingUpload;