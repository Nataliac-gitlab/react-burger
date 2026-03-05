import React, { useMemo } from "react";
import { getIngredientItemById } from "../../burger-ingredients/services/selectors";
import { useAppSelector } from "../../../services/hooks";
import styles from "./image-container.module.css";
import { ImageMagicCircle } from "../feed-common/image-magic-circle";

type ImageContainerProps = {
  id: string;
  pos?: number;
};
export const ImageContainer = ({ id, pos = 0 }: ImageContainerProps) => {
  const ingredient = useAppSelector((state) =>
    getIngredientItemById(state, id),
  );

  const dynamicStyles = useMemo(
    () =>
      ({
        "--offset": pos,
        "--z-index": 100 - pos,
      }) as React.CSSProperties,
    [pos],
  );

  if (!ingredient) {
    return null;
  }
  return (
    <div style={dynamicStyles} className={styles.circle}>
      <ImageMagicCircle image={ingredient.image} />
    </div>
  );
};
