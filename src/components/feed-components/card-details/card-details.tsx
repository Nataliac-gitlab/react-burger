import React from "react";
import styles from "./card-details.module.css";
import { FeedIngredient } from "./feed-ingredient";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Status } from "./status";
import { Price } from "../feed-common/price";
import {
  getOrderIngredientCountByNumber,
  getOrderByNumber,
  getOrderPriceByNumber,
} from "../services/selectors";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../services/hooks";

export const CardDetails = () => {
  const { number } = useParams();
  const order = useAppSelector((state) => getOrderByNumber(state, number));
  const price = useAppSelector((state) => getOrderPriceByNumber(state, number));
  const ingredientCounts = useAppSelector((state) =>
    getOrderIngredientCountByNumber(state, number),
  );

  if (!order || !price || !ingredientCounts) {
    return (<div>...Error</div>);
  }

  const uniqueIngredientIds = Object.keys(ingredientCounts);
  const { name, status, createdAt } = order;

  return (
    <div className={styles.container}>
      <div className={styles.number}>#{number}</div>
      <div className={styles.name}>{name}</div>
      <div className={styles.status}>
        <Status status={status} />
      </div>
      <div className={styles.content}>Состав:</div>
      <ul className={styles.list_container}>
        {uniqueIngredientIds.map((item) => (
          <li key={item}>
            <FeedIngredient id={item} count={ingredientCounts[item] || 0} />
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <div className={styles.date}>
          <FormattedDate date={new Date(createdAt)} />
        </div>
        <Price price={price || 0} />
      </div>
    </div>
  );
};
