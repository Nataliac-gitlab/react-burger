import React from "react";
import styles from "./price.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type PriceProps = {
  price: number;
};

export const Price = ({ price }: PriceProps) => {
  return (
    <div className={styles.price_row}>
      <div className={styles.price}>{price}</div>
      <CurrencyIcon type="primary" />
    </div>
  );
};
