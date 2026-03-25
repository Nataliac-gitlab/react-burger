import React from "react";
import styles from "./image-magic-circle.module.css";

type ImageMagicCircleProps = {
  image: string;
  name?: string;
};
export const ImageMagicCircle = ({ image, name }: ImageMagicCircleProps) => {
  return (
    <div className={styles.circle_gradient}>
      <img src={image} alt={name} />
    </div>
  );
};
