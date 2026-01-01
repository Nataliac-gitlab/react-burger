import React, { ReactNode } from "react";
import styles from "./modal-overlay.module.css";

type ModalOverlayProps = {
  onClose: () => void;
  children: ReactNode;
};

export const ModalOverlay = ({ onClose, children }: ModalOverlayProps) => {
  return (<div className={styles.modal_overlay} onClick={onClose} >
    {children}
  </div>);
};
