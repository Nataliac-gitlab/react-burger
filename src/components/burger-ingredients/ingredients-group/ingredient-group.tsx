import React from "react";
import { IngredientTypes, AllIngredients } from "../../../common/types";
import dataJSON from "../../../utils/data.json";
import styles from "./ingredient-group.module.css";
import { IngredientItem } from "../ingredient-item/ingredient-item";

type IngredientsGroupProps = {
  type: IngredientTypes;
};

export const IngredientsGroup = ({ type }: IngredientsGroupProps) => {
  const data = dataJSON.filter((item) => item.type === type);

  return (
    <>
      <p className={styles.type}>{AllIngredients[type]}</p>
      <ul className={styles.grid_list}>
        {data.map((item, index) => {
          const { name, image, price } = item;
          return (
            <li key={index}>
              <IngredientItem name={name} image={image} price={price} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
