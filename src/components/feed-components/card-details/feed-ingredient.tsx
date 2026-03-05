import React from "react";
import { useAppSelector } from "../../../services/hooks";
import { getIngredientItemById } from "../../burger-ingredients/services/selectors";
import { ImageMagicCircle } from "../feed-common/image-magic-circle";
import { Price } from "../feed-common/price";

import styles from "./feed-ingredient.module.css";

type FeedIngredientProps = {
  id: string;
  count: number;
};
export const FeedIngredient = ({ id, count }: FeedIngredientProps) => {
  const ingredient = useAppSelector((state) =>
    getIngredientItemById(state, id),
  );
  if (!ingredient) {
    return null;
  }
  const { image, name, price } = ingredient;
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <ImageMagicCircle image={image} />
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.count}>{count} x </div>
        <Price price={price} />
      </div>
    </div>
  );
};
