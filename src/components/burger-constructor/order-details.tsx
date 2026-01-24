import React, { useEffect } from "react";
import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useGetOrderQuery } from "../../redux/api";
import { getOrderRequest, getOrder } from "./redux/selectors";
import { setOrder } from "./redux/slice";
import { useSelector, useDispatch } from "react-redux";

export const OrderDetails = () => {
  const orderRequest = useSelector(getOrderRequest);
  const order = useSelector(getOrder);
  const dispatch = useDispatch();
  const orderText = order ? order : "";

  const { data, isError, isLoading, isSuccess } =
    useGetOrderQuery(orderRequest);

  useEffect(() => {
    if (isSuccess && data) {
      if (data.order.number) {
        dispatch(setOrder(data.order.number));
      }
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.order}>{isSuccess && orderText}</div>
      {(isError || !order) && (
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
