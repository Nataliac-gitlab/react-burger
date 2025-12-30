import React from "react";
import {
  IngredientItemType,
  IngredientTypes,
  AllIngredients,
} from "../../../common/types";
import styles from "./ingredient-group.module.css";
import { IngredientItem } from "../ingredient-item/ingredient-item";

type IngredientsGroupProps = {
  type: IngredientTypes;
  data: IngredientItemType[];
  onClick: (item: IngredientItemType) => void;
};

export const IngredientsGroup = ({
  type,
  data,
  onClick,
}: IngredientsGroupProps) => {
  const group = data.filter((item) => item.type === type);

  return (
    <>
      <p className={styles.type}>{AllIngredients[type]}</p>
      <ul className={styles.grid_list}>
        {group.map((item, index) => {
          const { name, image, price } = item;
          return (
            <li key={item._id} onClick={() => onClick(item)}>
              <IngredientItem name={name} image={image} price={price} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
