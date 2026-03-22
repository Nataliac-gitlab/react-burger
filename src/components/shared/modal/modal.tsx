import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "./modal-overlay";

interface IModalProps {
  title?: string;
  onClose: () => void;
  size?: "big" | "small";
  children: ReactNode;
}

export const Modal = ({
  title,
  onClose,
  children,
  size = "big",
}: IModalProps) => {
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

  const sizeClass = size === "big" ? styles.modal_big : styles.modal_small;

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div
        className={`${styles.modal_content} ${sizeClass}`}
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
