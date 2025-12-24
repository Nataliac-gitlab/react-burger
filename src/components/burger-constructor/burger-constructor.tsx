import React from "react";
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

const getScrollHeight = (windowHeight: number, count: number): number => {
  return Math.min(90 * count, Math.max(90, windowHeight - 500));
};

export const BurgerConstructor = () => {
  const burger = stub.map((id) => {
    return dataJSON.find((item) => item._id === id);
  });
  const bun = burger.find((item) => item?.type === IngredientTypes.bun);
  const rest = burger.filter((item) => item?.type !== IngredientTypes.bun);

  if (!burger || !bun || !rest) {
    return null;
  }
  const sum =
    rest.reduce((acc, val) => {
      return acc + (val?.price ? val.price : 0);
    }, 0) + (bun?.price ? 2 * bun?.price : 0);

  //add hoock, it works now after reload
  const windowHeight = window.innerHeight;

  return (
    <div className={styles.burger_constructor}>
      <div className={styles.element}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun?.name + " (верх)"}
          price={bun?.price || 0}
          thumbnail={bun?.image || ""}
        />
      </div>

      <div
        className={styles.list_container}
        style={{ height: getScrollHeight(windowHeight, rest.length) }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {rest &&
            rest.map((item, index) => (
              <div className={styles.row}>
                <DragIcon type="primary" key={index} />
                <ConstructorElement
                  key={item?._id}
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
          text={bun?.name + " (низ)"}
          price={bun?.price || 0}
          thumbnail={bun?.image || ""}
        />
      </div>
      <footer className={styles.footer}>
        <p style={{ paddingRight: 8 }}>{sum}</p>
        <div style={{ paddingRight: 20 }}>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="ml-2"
        >
          Оформить заказ
        </Button>
      </footer>
    </div>
  );
};
