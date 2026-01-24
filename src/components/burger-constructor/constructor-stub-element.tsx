import React from "react";
import styles from "./constructor-stub-element.module.css";

type ConstructorStubElementProps = {
  type?: "top" | "bottom";
  text?: string;
};

export const ConstructorStubElement = ({
  type,
  text,
}: ConstructorStubElementProps) => {
  return (
    <div className={styles.element}>
      <div
        className={
          type === "top"
            ? styles.stub_top
            : type === "bottom"
            ? styles.stub_bottom
            : styles.stub
        }
      >
        <div>
          <span className={styles.stub_text}>{text}</span>
        </div>
      </div>
    </div>
  );
};
