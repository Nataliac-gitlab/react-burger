import React from "react";
import { IngredientTypes, IngredientTitles } from "../../../common/types";
import styles from "./ingredient-group.module.css";
import { IngredientItem } from "../ingredient-item/ingredient-item";
import { setCurrentIngredientId } from "../ingredient-details/services/slice";
import { getIngredientIdsByType } from "../services/selectors";
import { useDispatch, useSelector } from "react-redux";

type IngredientsGroupProps = {
  type: IngredientTypes;
};

export const IngredientsGroup = ({ type }: IngredientsGroupProps) => {
  const group = useSelector((state) => getIngredientIdsByType(state, type));

  const dispatch = useDispatch();

  const handleOnClick = (id: string) => {
    dispatch(setCurrentIngredientId(id));
  };
  return (
    <>
      <p className={styles.type}>{IngredientTitles[type]}</p>
      <ul className={styles.grid_list}>
        {group.map((id) => {
          return (
            <li key={id} onClick={() => handleOnClick(id)}>
              <IngredientItem id={id} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
