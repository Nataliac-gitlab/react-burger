import React from "react";
import styles from "./feed.module.css";
import { FeedList } from "../components/feed-components/feed-list";
import { FeedInfo } from "../components/feed-components/feed-info";
import { useGetOrdersFeedQuery } from "../services/api";

export const Feed = () => {
  const { isError, isLoading } = useGetOrdersFeedQuery("all");

  if (isError) return <div>Ошибка попучения данных...</div>;
  if (isLoading) return <div>Загрузка данных...</div>;
  return (
    <section className={styles.container}>
      <FeedList />
      <FeedInfo />
    </section>
  );
};
