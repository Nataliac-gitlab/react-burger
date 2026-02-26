import styles from "./header-item.module.css";
import React, { ReactNode } from "react";

interface IHeaderItemProps {
  children: ReactNode;
  text: string;
  isSelected: boolean;
  onClick?: () => void;
}

export const HeaderItem = (props: IHeaderItemProps) => {
  const { children, text, isSelected, onClick } = props;
  return (
    <div className={styles.header_item} onClick={onClick}>
      <div className={styles.icon}>{children}</div>
      <p className={isSelected ? styles.text : styles.text_inactive}>{text}</p>
    </div>
  );
};
