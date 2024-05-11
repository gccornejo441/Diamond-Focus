import React, { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';
import { ReactComponent as SettingButton } from '../assets/settingIcon.svg';

interface DropdownItemProps {
    name: string;
    onDropDownItemClick: (name: string) => void;
}

const DropdownItem = ({ name, onDropDownItemClick }: DropdownItemProps) => (
    <button
        onClick={() => onDropDownItemClick(name)}
        className={styles.menuLink}
        aria-label={`Open ${name} settings`}>
        <span>{name}</span>
    </button>
);

interface DropdownProps {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSidebarListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown = ({ setModalOpen, setSidebarListOpen }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);


    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleMouseDown);
        }

        return () => document.removeEventListener("mousedown", handleMouseDown);
    }, [isOpen]);



    const onDropdownItemClick = (name: string): void => {
        switch (name) {
            case "Settings":
                setModalOpen(true);
                setIsOpen(false);
                break;
            case "Lists":
                setIsOpen(false);
                setSidebarListOpen(true);
                break;
        }
    }

    return (
        <div className={`${styles.relative} ${styles.uiDropdownTrigger}`} ref={dropdownRef}>
            <button title="More" className="controlButton" onClick={toggleDropdown}>
                <SettingButton style={{ width: '20px', height: '20px' }} aria-label="Setting Button" />
            </button>
            {isOpen && (
                <div className={styles.dropdownWrapper}>
                    <div className={styles.menuLinksWrapper}>
                        <DropdownItem name="Settings" onDropDownItemClick={onDropdownItemClick} />
                        <DropdownItem name="Lists" onDropDownItemClick={onDropdownItemClick} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dropdown;