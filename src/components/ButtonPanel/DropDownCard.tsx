import React from 'react';
import styles from './ButtonPanel.module.css';

interface DropDownCardProps {
    data: string[];
    setOpen: (open: boolean) => void;
}

const DropDownCard: React.FC<DropDownCardProps> = ({ data, setOpen }) => {
    return (
        <div className={styles.dropdownCard}>
            <ul className={styles.list}>
                {data.map((item, index) => (
                    <li key={index} className={styles.listItem} onClick={() => setOpen(false)}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DropDownCard;