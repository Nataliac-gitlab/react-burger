import React from "react";
import styles from "./modal-overlay.module.css";

type ModalOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalOverlay = ({ isOpen, onClose }: ModalOverlayProps) => {
  if (!isOpen) {
    return null;
  }

  return <div className={styles.modal_overlay} onClick={onClose} />;
};
