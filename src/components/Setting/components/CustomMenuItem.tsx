import React from "react";
import styles from "../styles/CustomMenuItem.module.css";

type MenuItemProps = {
  isActive: boolean;
  text: string;
  IconComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  onClick: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  isActive,
  text,
  IconComponent,
  onClick,
}) => {
  return (
    <li
      className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <button className={styles.menuLink}>
        <span className={styles.menuLinkContent}>
          <IconComponent className={styles.svgStyle} />
          <span className={styles.menuText}>{text}</span>
        </span>
      </button>
    </li>
  );
};

export default MenuItem;
