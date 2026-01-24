import React from "react";
import styles from "./ingredient-item.module.css";
import { useSelector } from "react-redux";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCountById } from "../../burger-constructor/redux/selectors";
import { getIngredientItemById } from "../../burger-ingredients/redux/selectors";

type IngredientItemProps = {
  id: string;
};

export const IngredientItem = ({ id }: IngredientItemProps) => {
  const count = useSelector((state) => getCountById(state, id));
  const item = useSelector((state) => getIngredientItemById(state, id));
  if (!item) {
    return null;
  }
  const { name, image, price } = item;

  return (
    <div className={styles.item}>
      {count !== 0 && (
        <div className={styles.counter}>
          <Counter count={count} size="small" />
        </div>
      )}

      <img src={image} alt={name}></img>

      <p>{name}</p>
      <div className={styles.price_row}>
        <p className={styles.price}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};
