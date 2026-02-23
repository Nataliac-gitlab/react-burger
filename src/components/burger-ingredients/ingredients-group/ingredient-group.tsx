import React from "react";
import { IngredientTypes, IngredientTitles } from "../../../common/types";
import styles from "./ingredient-group.module.css";
import { IngredientItem } from "../ingredient-item/ingredient-item";
import { getIngredientIdsByType } from "../services/selectors";
import { useAppSelector } from "../../../servives/hooks";

type IngredientsGroupProps = {
  type: IngredientTypes;
};

export const IngredientsGroup = ({ type }: IngredientsGroupProps) => {
  const group = useAppSelector((state) => getIngredientIdsByType(state, type));

  return (
    <>
      <p className={styles.type}>{IngredientTitles[type]}</p>
      <ul className={styles.grid_list}>
        {group.map((id) => {
          return (
            <li key={id} onClick={() => {}}>
              <IngredientItem id={id} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
