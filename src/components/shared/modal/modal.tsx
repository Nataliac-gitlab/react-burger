import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "./modal-overlay";

type ModalProps = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ title, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div>{title}</div>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.body,
  );
};
