import React from "react";
import styles from "./ingredient-item.module.css";
import { useAppSelector } from "../../../services/hooks";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCountById } from "../../burger-constructor/services/selectors";
import { getIngredientItemById } from "../services/selectors";
import { useDrag } from "react-dnd";
import { DraggedIngredientItem } from "./../../../common/types";
import { useLocation, Link } from "react-router-dom";
import { Price } from "../../feed-components/feed-common/price";

interface IIngredientItemProps {
  id: string;
}

export const IngredientItem = ({ id }: IIngredientItemProps) => {
  const count = useAppSelector(getCountById(id));
  const ingredient = useAppSelector(getIngredientItemById(id));
  const location = useLocation();

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
        <Link to={`/ingredients/${id}`} state={{ background: location }}>
          <img src={image} alt={name}></img>
        </Link>
        <div className={styles.name}>{name}</div>
        <Price price={price} />
      </div>
    </div>
  );
};
