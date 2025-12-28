import React, { useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import dataJSON from "../../utils/data.json";
import { stub } from "../../utils/stub";
import styles from "./burger-constructor.module.css";
import { IngredientTypes } from "../../common/types";
import { Modal } from "../shared/modal/modal";
import { OrderDetails } from "./order-details";

const getScrollMaxHeight = (count: number): number => {
  return count * 90;
};

export const BurgerConstructor = () => {
  const burger = stub
    .map((id) => {
      return dataJSON.find((item) => item._id === id); //Stub, shoult be removed
    })
    .filter((el) => el !== undefined);

  const bunItem = burger.find((item) => item?.type === IngredientTypes.bun);
  const restItems = burger.filter((item) => item?.type !== IngredientTypes.bun);
  const [isOpen, setIsOpen] = useState(false);

  const sum =
    restItems.reduce((acc, item) => acc + (item ? item?.price : 0), 0) +
    (bunItem ? bunItem.price * 2 : 0);

  return (
    <div className={styles.burger_constructor}>
      <div className={styles.element}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bunItem?.name + " (верх)"}
          price={bunItem?.price || 0}
          thumbnail={bunItem?.image || ""}
        />
      </div>

      <div
        className={styles.list_container}
        style={{ maxHeight: getScrollMaxHeight(restItems.length) }}
      >
        <div className={styles.list}>
          {restItems.map((item) => (
            <div className={styles.row} key={item?._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item?.name || ""}
                price={item?.price || 0}
                thumbnail={item?.image || ""}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.element}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bunItem?.name + " (низ)"}
          price={bunItem?.price || 0}
          thumbnail={bunItem?.image || ""}
        />
      </div>
      <footer className={styles.footer}>
        <p className="pr-2 text text_type_digits-medium">{sum}</p>
        <div className="mr-5">
          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="ml-2"
          onClick={() => setIsOpen(true)}
        >
          Оформить заказ
        </Button>
      </footer>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <OrderDetails order={"034536"} />
      </Modal>
    </div>
  );
};
