import React, { ReactNode } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  onClose: () => void;
  children: ReactNode;
}

export const ModalOverlay = ({ onClose, children }: IModalOverlayProps) => {
  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      {children}
    </div>
  );
};
