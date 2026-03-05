import React from "react";
import styles from "./feed-list.module.css";
import { FeedCard } from "./feed-card/feed-card";
import { useAppSelector } from "../../services/hooks";
import { getOrders, getPrices } from "./services/selectors";

export const FeedList = () => {
  const orders = useAppSelector(getOrders);
  const prices = useAppSelector(getPrices);

  return (
    <div>
      <div className={styles.title}>Лента заказов</div>
      <div className={styles.list_container}>
        {orders.map((order, key) => (
          <FeedCard order={order} price={prices[key]} key={order.number} />
        ))}
      </div>
    </div>
  );
};
