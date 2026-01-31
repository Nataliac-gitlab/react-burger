import React from "react";
import styles from "./ingredient-details.module.css";
import { useAppSelector } from "../../../servives/hooks";
import { getIngredientDetails } from "./services/selectors";

export const IngredientDetails = () => {
  const details = useAppSelector(getIngredientDetails);
  if (!details) {
    return null;
  }

  const { image, name, calories, proteins, fat, carbohydrates } = details;

  return (
    <div className={styles.container}>
      <img src={image} alt={name}></img>
      <div className={styles.name}>{name}</div>
      <div className={styles.values}>
        <div style={{ marginRight: 20 }} className={styles.nutrient}>
          <span>Калории,ккал</span>
          <span>{calories}</span>
        </div>
        <div style={{ marginRight: 20 }} className={styles.nutrient}>
          <span>Белки, г</span>
          <span>{proteins}</span>
        </div>
        <div style={{ marginRight: 20 }} className={styles.nutrient}>
          <span>Жиры, г</span>
          <span>{fat}</span>
        </div>
        <div className={styles.nutrient}>
          <span>Углеводы, г</span>
          <span>{carbohydrates}</span>
        </div>
      </div>
    </div>
  );
};
