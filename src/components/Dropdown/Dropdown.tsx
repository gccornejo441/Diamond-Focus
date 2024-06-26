import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Dropdown.module.css";
import IconRepository, { IconName } from "@utilities/dropDownHelpers";

interface DropdownItemProps {
  name: IconName;
  icon: ReactNode;
  onDropDownItemClick: (name: IconName) => void;
}

const DropdownItem = ({
  name,
  icon,
  onDropDownItemClick,
}: DropdownItemProps) => (
  <button
    onClick={() => onDropDownItemClick(name)}
    className={styles.menuLink}
    aria-label={`Open ${name} settings`}
  >
    <span className={styles.menuIcon}>{icon}</span>
    <span className={styles.menuText}>{name}</span>
  </button>
);

export interface StateHandlers {
  [key: string]: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DropdownProps {
  stateHandlers: StateHandlers;
  names: { name: IconName }[];
  children: ReactNode;
  className?: string;
  alignment?: "left" | "right" | "center";
}

const Dropdown = ({
  stateHandlers,
  children,
  names,
  className,
  alignment = "left",
}: DropdownProps) => {
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

  const onDropdownItemClick = (name: IconName): void => {
    if (stateHandlers[name]) {
      stateHandlers[name](true);
      setIsOpen(false);
    }
  };

  const icons = useMemo(() => IconRepository({ names }), [names]);

  const getAlignmentStyle = () => {
    switch (alignment) {
      case "right":
        return styles.alignRight;
      case "center":
        return styles.alignCenter;
      default:
        return styles.alignLeft;
    }
  };

  return (
    <div className={`${styles.relative}`} ref={dropdownRef}>
      <button
        aria-expanded={isOpen}
        aria-controls="dropdown"
        aria-haspopup="true"
        aria-label="Open dropdown"
        className={className || "controlButton"}
        onClick={toggleDropdown}
      >
        {children}
      </button>
      {isOpen && (
        <div className={`${styles.dropdownWrapper} ${getAlignmentStyle()}`}>
          <div className={styles.menuLinksWrapper}>
            {names.map((obj, index) => (
              <DropdownItem
                key={`${obj.name}-${index}`}
                name={obj.name}
                icon={icons[index]}
                onDropDownItemClick={() => onDropdownItemClick(obj.name)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
