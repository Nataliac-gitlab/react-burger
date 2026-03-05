import React from "react";
import { useAppSelector } from "../../services/hooks";
import {
  getDone,
  getInProgress,
  getTotal,
  getTotalToday,
} from "./services/selectors";
import styles from "./feed-info.module.css";

export const FeedInfo = () => {
  const total = useAppSelector(getTotal);
  const totalToday = useAppSelector(getTotalToday);
  const done = useAppSelector(getDone);
  const inProgress = useAppSelector(getInProgress);
  //[    123456, 123456, 123456, 123456, 123456, 123456, 123456, 123456, 123456,    123456, 123456,  ];

  return (
    <div className={styles.container}>
      <section className={styles.status_section}>
        <div className={styles.column}>
          <div className={styles.status_text}>Готовы:</div>
          <ul className={`${styles.grid} ${styles.done}`}>
            {done.slice(0, 20).map((num) => (
              <li className={styles.status_numbers} key={num}>
                {num}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <div className={styles.status_text}>В работе:</div>
          <ul className={styles.grid}>
            {inProgress.slice(0, 20).map((num) => (
              <li className={styles.status_numbers} key={num}>
                {num}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className={styles.text}>Выполнено за все время:</div>
      <div className={styles.numbers}>{total}</div>
      <div className={styles.text}>Выполнено за сегодня:</div>
      <div className={styles.numbers}>{totalToday}</div>
    </div>
  );
};
