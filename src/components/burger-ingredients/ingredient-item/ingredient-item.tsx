import React from "react";
import styles from "./ingredient-item.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

type IngredientItemProps = {
  name: string;
  image: string;
  price: number;
};

export const IngredientItem = ({ name, image, price }: IngredientItemProps) => {
  const displayCounter =
    name === "Краторная булка N-200i" ||
    name === "Соус традиционный галактический"; //remove it

  return (
    <div className={styles.item}>
      {displayCounter && (
        <div className={styles.counter}>
          <Counter count={1} size="small" />
        </div>
      )}

      <img src={image} alt={name}></img>

      <p>{name}</p>
      <div className={styles.price}>
        <p style={{ paddingRight: 8 }}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};
