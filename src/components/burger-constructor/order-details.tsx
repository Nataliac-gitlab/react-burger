import React, { useEffect } from "react";
import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useGetOrderQuery } from "./services/constructor-api";
import { getOrderRequest, getOrder } from "./services/selectors";
import { setOrder } from "./services/slice";
import { useAppDispatch, useAppSelector } from "../../services/hooks";

export const OrderDetails = () => {
  const orderRequest = useAppSelector(getOrderRequest);
  const order = useAppSelector(getOrder);
  const dispatch = useAppDispatch();
  const orderText = order ? order : "";

  const { data, isError, isLoading, isSuccess } = useGetOrderQuery(
    orderRequest,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (isSuccess && data) {
      if (data.order.number) {
        dispatch(setOrder(data.order.number));
      }
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.order} data-testid="order">
        {isSuccess && orderText}
      </div>
      {isError && (
        <div className={styles.identifier}>Ошибка создания заказа</div>
      )}
      {isLoading && <div className={styles.identifier}>Создание заказа...</div>}
      {isSuccess && (
        <>
          <div className={styles.identifier}>Идентификатор заказа</div>
          <CheckMarkIcon type="primary" />
          <div className={styles.message}>Ваш заказ начали готовить</div>
          <div className={styles.message2}>
            Дождитесь готовности на орбитальной станции
          </div>
        </>
      )}
    </div>
  );
};
