import React, { useEffect } from "react";
import styles from "./ingredient-details.module.css";
import { useAppSelector } from "../../../servives/hooks";
import { getIngredientItemById } from "../../burger-ingredients/services/selectors";
import { useParams } from "react-router-dom";
import { useGetIngredientItemsQuery } from "../../../servives/api";
import { useDispatch } from "react-redux";
import { setBurgerIngredients } from "../../../components/burger-ingredients/services/slice";

export const IngredientDetails = () => {
  const { id } = useParams();
  const details = useAppSelector((state) => getIngredientItemById(state, id));
  //persist
  const { data = [], isSuccess } = useGetIngredientItemsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setBurgerIngredients(data));
    }
  }, [isSuccess, data, dispatch]);

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
