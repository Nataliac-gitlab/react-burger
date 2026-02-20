import React from "react";
import styles from "./ingredient-details.module.css";

import { useParams } from "react-router-dom";
import { useGetIngredientItemsQuery } from "../../../servives/api";

export const IngredientDetails = () => {
  const { id } = useParams();
  const { data = [], isLoading, isError } = useGetIngredientItemsQuery();

  const details = data.find((item) => item._id === id);

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка</div>;
  if (!details) return <div>Ингредиент не найден</div>;
  const { image, name, calories, proteins, fat, carbohydrates } = details;

  return (
    <div className={styles.container}>
      <div className={styles.title}>Детали ингредиента</div>
      <img className={styles.image} src={image} alt={name}></img>
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.values}>
        <div className={styles.nutrient}>
          <span>Калории, ккал</span>
          <span>{calories}</span>
        </div>
        <div className={styles.nutrient}>
          <span>Белки, г</span>
          <span>{proteins}</span>
        </div>
        <div className={styles.nutrient}>
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
