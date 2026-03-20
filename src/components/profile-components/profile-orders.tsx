import React from "react";
import styles from "./profile-orders.module.css";
import { FeedCard } from "../feed-components/feed-card/feed-card";
import { useAppSelector } from "../../services/hooks";
import { getPrices } from "../feed-components/services/cash-selectors";
import { getOrders } from "../feed-components/services/cash-selectors";
import { useGetOrdersFeedQuery } from "../../services/api";

export const ProfileOrders = () => {
  const orders = useAppSelector(getOrders("user"));
  const prices = useAppSelector(getPrices("user"));

  const { isLoading, isError } = useGetOrdersFeedQuery("user");

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка...</div>;

  return (
    <div>
      <div className={styles.list_container}>
        {orders?.map((order, key) => (
          <FeedCard order={order} price={prices[key]} key={order.number} />
        ))}
      </div>
    </div>
  );
};
