import React from "react";
import styles from "../styles/CustomMenuItem.module.css";

type MenuItemProps = {
  isActive: boolean;
  link: string;
  text: string;
  IconComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  onClick: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  isActive,
  link,
  text,
  IconComponent,
  onClick,
}) => {
  return (
    <li
      className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <a href={link} className={styles.menuLink}>
        <span className={styles.menuLinkContent}>
          <IconComponent className={styles.svgStyle} />
          <span className={styles.menuText}>{text}</span>
        </span>
      </a>
    </li>
  );
};

export default MenuItem;
