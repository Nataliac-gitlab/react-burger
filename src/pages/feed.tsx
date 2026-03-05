import React from "react";
import styles from "./feed.module.css";
import { FeedList } from "../components/feed-components/feed-list";
import { FeedInfo } from "../components/feed-components/feed-info";

export const Feed = () => {
  return (
    <section className={styles.container}>
      <FeedList />
      <FeedInfo />
    </section>
  );
};
