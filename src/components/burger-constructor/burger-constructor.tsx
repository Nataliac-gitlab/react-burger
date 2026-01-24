import React, { useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.css";
import { Modal } from "../shared/modal/modal";
import { OrderDetails } from "./order-details";
import { useSelector } from "react-redux";
import { getBun, getToppings, getTotalPrice, getScrollMaxHeight } from "./redux/selectors";
import { ConstructorStubElement } from "./constructor-stub-element";

export const BurgerConstructor = () => {
  const bun = useSelector(getBun);
  const toppings = useSelector(getToppings);
  const totalPrice = useSelector(getTotalPrice);
  const height = useSelector(getScrollMaxHeight);

  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.burger_constructor}>
      {!bun && <ConstructorStubElement type="top" text="Выберите булку" />}

      {bun && (
        <div className={styles.element}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      {toppings.length === 0 && <ConstructorStubElement text="Выберите начинку" />}

      <div
        className={styles.list_container}
        style={{ maxHeight: height }}
      >
        <div className={styles.list}>
          {toppings.map(
            (item, index) =>
              item && (
                <div className={styles.row} key={item._id + index}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </div>
              )
          )}
        </div>
      </div>

      {bun && (
        <div className={styles.element}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      {!bun && <ConstructorStubElement type="bottom" text="Выберите булку" />}
      <footer className={styles.footer}>
        <p className="pr-2 text text_type_digits-medium">{totalPrice}</p>
        <div className="mr-5">
          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="ml-2"
          onClick={handleOnClick}
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
        <OrderDetails />
      </Modal>
    </div>
  );
};
