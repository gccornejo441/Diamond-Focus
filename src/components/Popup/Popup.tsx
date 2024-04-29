import React from 'react';
import style from './Popup.module.css';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Popup = ({ isOpen, onClose, children }: PopupProps) => {
    if (!isOpen) return null;

    return (
        <div className={style.modalOverlay} onClick={onClose}>
            <div className={style.modal} onClick={e => e.stopPropagation()}>
                {children}
                <button onClick={onClose} className={style.closeButton}>Close</button>
            </div>
        </div>
    );
};

export default Popup;
