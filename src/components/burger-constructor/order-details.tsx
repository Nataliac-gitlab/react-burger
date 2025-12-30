import React from "react";
import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type OrderDetailsProps = {
  order: string;
};

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.order}>{order}</div>
      <div className={styles.identifier}>Идентификатор заказа</div>
      <CheckMarkIcon type="primary" />
      <div className={styles.message}>Ваш заказ начали готовить</div>
      <div className={styles.message2}>
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
};
