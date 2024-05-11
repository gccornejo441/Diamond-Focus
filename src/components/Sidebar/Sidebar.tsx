import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import settingStyles from '../Setting/Setting.module.css';
import { ReactComponent as CancelButton } from '../assets/cancelIcon.svg';
import { ReactComponent as GemIcon } from '../assets/gemIcon.svg';

interface SidebarProps {
    taskDescription: string;
    isOpen: boolean;
    toggleSidebar: () => void;
}

interface NavigationItemProps {
    label: string;
    children?: React.ReactNode;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div>
            <button onClick={handleToggle}>{label}</button>
            {isOpen && <div className={styles.submenu}>{children}</div>}
        </div>
    )
}


const Sidebar = ({ isOpen, toggleSidebar, taskDescription }: SidebarProps) => {
    return (
        <div className={isOpen ? `${settingStyles.modalOverlay}` : ""}>
            <div className={isOpen ? `${styles.sidebar} ${styles.open}` : `${styles.sidebar} ${styles.closed}`}>
                <CancelButton className={styles.cancelButton} onClick={toggleSidebar} />
                <nav>
                    <GemIcon aria-label="Gem Icon" className={settingStyles.icon} />
                    <h2 className={styles.sideBarTitle}>Diamond Focus</h2>
                    <p>{taskDescription}</p>
                    {/* <NavigationItem label="Home" />
                <NavigationItem label="About">
                    <ul>
                        <li>{taskDescription}</li>
                    </ul>
                </NavigationItem> */}
                </nav>
            </div>
        </div>
    )
}

export default Sidebar;