import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useAppDispatch, useAppSelector } from "../../servives/hooks";
import { getIngredientItemById } from "../burger-ingredients/services/selectors";
import { removeToppingByIndex, moveTopping } from "./services/slice";

type DraggableToppingProps = {
  id: string;
  index: number;
};

export const DraggableTopping = ({ id, index }: DraggableToppingProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const topping = useAppSelector((state) => getIngredientItemById(state, id));
  const dispatch = useAppDispatch();

  const handleOnDelete = (index: number) => {
    dispatch(removeToppingByIndex(index));
  };

  const [{ isDrag }, drag] = useDrag({
    type: "sortedTopping",
    item: { id, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "sortedTopping",
    drop(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const fromIndex = item.index;
      const toIndex = index;

      if (fromIndex === toIndex) {
        return;
      }

      dispatch(moveTopping({ fromIndex, toIndex }));
    },
  });

  drag(drop(ref));

  if (!topping) {
    return null;
  }

  const { name, price, image } = topping;

  return (
    <div ref={ref} className={styles.row} style={{ opacity: isDrag ? 0 : 1 }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => handleOnDelete(index)}
      />
    </div>
  );
};
