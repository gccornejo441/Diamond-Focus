import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";

interface DropdownItemProps {
  name: string;
  onDropDownItemClick: (name: string) => void;
}

const DropdownItem = ({ name, onDropDownItemClick }: DropdownItemProps) => (
  <button
    onClick={() => onDropDownItemClick(name)}
    className={styles.menuLink}
    aria-label={`Open ${name} settings`}
  >
    <span>{name}</span>
  </button>
);

interface StateHandlers {
  [key: string]: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DropdownProps {
  stateHandlers: StateHandlers;
  children: ReactNode;
}

const Dropdown = ({ stateHandlers, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleMouseDown);
    }

    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isOpen]);

  const onDropdownItemClick = (name: string): void => {
    if (stateHandlers[name]) {
      stateHandlers[name](true);
      setIsOpen(true);
    }
  };
  return (
    <div
      className={`${styles.relative} ${styles.uiDropdownTrigger}`}
      ref={dropdownRef}
    >
      <button title="More" className="controlButton" onClick={toggleDropdown}>
        {children}
      </button>
      {isOpen && (
        <div className={styles.dropdownWrapper}>
          <div className={styles.menuLinksWrapper}>
            {Object.keys(stateHandlers).map((name) => (
              <DropdownItem
                key={name}
                name={name}
                onDropDownItemClick={onDropdownItemClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
