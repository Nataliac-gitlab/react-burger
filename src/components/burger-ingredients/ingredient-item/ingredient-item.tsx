import React from "react";
import styles from "./ingredient-item.module.css";
import { useAppSelector } from "../../../servives/hooks";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCountById } from "../../burger-constructor/services/selectors";
import { getIngredientItemById } from "../services/selectors";
import { useDrag } from "react-dnd";
import { DraggedIngredientItem } from "./../../../common/types";

type IngredientItemProps = {
  id: string;
};

export const IngredientItem = ({ id }: IngredientItemProps) => {
  const count = useAppSelector((state) => getCountById(state, id));
  const ingredient = useAppSelector((state) =>
    getIngredientItemById(state, id),
  );

  const [{ isDrag }, dragRef] = useDrag<
    DraggedIngredientItem,
    unknown,
    { isDrag: boolean }
  >({
    type: "ingredient",
    item: { id, type: ingredient?.type || "" },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  if (!ingredient) {
    return null;
  }
  const { name, image, price } = ingredient;

  return (
    <div style={{ opacity: isDrag ? 0.5 : 1 }}>
      {count !== 0 && (
        <div className={styles.counter}>
          <Counter count={count} size="small" />
        </div>
      )}
      <div
        className={styles.item}
        ref={(node) => {
          dragRef(node);
        }}
      >
        <img src={image} alt={name}></img>
        <p>{name}</p>
        <div className={styles.price_row}>
          <p className={styles.price}>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
