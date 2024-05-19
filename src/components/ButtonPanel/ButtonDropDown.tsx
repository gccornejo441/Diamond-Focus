import React, { useState, useRef, useEffect } from "react";
import DropDownCard from "./DropDownCard";
import styles from "./ButtonPanel.module.css";

const sampleData = new Array(7).fill("item name");

const ButtonDropDown: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      isOpen
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOpen]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={styles.button} onClick={() => setOpen(!isOpen)}>
        Dropdown
      </button>
      {isOpen && <DropDownCard data={sampleData} setOpen={setOpen} />}
    </div>
  );
};

export default ButtonDropDown;
