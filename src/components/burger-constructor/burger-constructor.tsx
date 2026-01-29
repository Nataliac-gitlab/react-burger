import React, { useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.css";
import { Modal } from "../shared/modal/modal";
import { OrderDetails } from "./order-details";
import { useSelector, useDispatch } from "react-redux";
import {
  getBun,
  getToppingIdsAndUuids,
  getTotalPrice,
  getScrollMaxHeight,
} from "./services/selectors";
import { ConstructorStubElement } from "./constructor-stub-element";
import { addTopping, addBun } from "./services/slice";
import { useDrop } from "react-dnd";
import { DraggedIngredientItem } from "./../../common/types";
import { DraggableTopping } from "./draggable-topping";

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const bun = useSelector(getBun);
  const toppingIdsUuids = useSelector(getToppingIdsAndUuids);
  const totalPrice = useSelector(getTotalPrice);
  const height = useSelector(getScrollMaxHeight);

  const [isOpen, setIsOpen] = useState(false);

  const handleOnClickOrder = () => {
    setIsOpen(true);
  };

  const addItem = (item: DraggedIngredientItem) => {
    if (item.type === "bun") {
      dispatch(addBun(item.id));
    } else {
      dispatch(addTopping(item.id));
    }
  };

  const [{ isHover, draggedItem }, dropTarget] = useDrop<
    DraggedIngredientItem,
    void,
    { isHover: boolean; draggedItem: DraggedIngredientItem }
  >(
    {
      accept: "ingredient",
      drop(item) {
        addItem(item);
      },

      collect: (monitor) => ({
        draggedItem: monitor.getItem(),
        isHover: monitor.isOver(),
      }),
    });

  const isBunHovering = isHover && draggedItem?.type === "bun";
  const isToppingHovering = isHover && draggedItem?.type !== "bun";

  return (
    <div
      className={styles.burger_constructor}
      ref={(node) => {
        dropTarget(node);
      }}
    >
      {!bun && (
        <ConstructorStubElement
          type="top"
          text="Выберите булку"
          isHover={isBunHovering}
        />
      )}

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
      {toppingIdsUuids.length === 0 && (
        <ConstructorStubElement
          text="Выберите начинку"
          isHover={isToppingHovering}
        />
      )}

      <div className={styles.list_container} style={{ maxHeight: height }}>
        <div className={styles.list}>
          {toppingIdsUuids.map(
            (item, index) =>
              item && (
                <DraggableTopping key={item.uuid} index={index} id={item.id} />
              ),
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
      {!bun && (
        <ConstructorStubElement
          type="bottom"
          text="Выберите булку"
          isHover={isBunHovering}
        />
      )}
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
          onClick={handleOnClickOrder}
          disabled={!bun}
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
