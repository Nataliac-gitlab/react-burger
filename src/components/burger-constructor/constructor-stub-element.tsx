import React from "react";
import styles from "./constructor-stub-element.module.css";

type ConstructorStubElementProps = {
  type?: "top" | "bottom";
  text?: string;
  isHover?: boolean;
};

export const ConstructorStubElement = ({
  type,
  text,
  isHover,
}: ConstructorStubElementProps) => {
  const stub_class = `${styles.stub} ${type === "top" ? styles.stub_top : ""} ${
    type === "bottom" ? styles.stub_bottom : ""
  } ${isHover ? styles.stub_hover : ""}`;
  return (
    <div className={styles.element}>
      <div className={stub_class}>
        <div>
          <span className={styles.stub_text}>{text}</span>
        </div>
      </div>
    </div>
  );
};
