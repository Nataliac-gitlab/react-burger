import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { AllIngredients, IngredientTypes } from "../../common/types";
import { IngredientsGroup } from "./ingredients-group/ingredient-group";
import styles from "./burger-ingredients.module.css";
import { Modal } from "../shared/modal/modal";
import { IngredientDetails } from "./ingredient-details/ingredient-details";
import { removeCurrentIngredientId } from "./ingredient-details/redux/slice";
import { getIngredientId } from "./ingredient-details/redux/selectors";
import { useSelector, useDispatch } from "react-redux";

export const BurgerIngredients = () => {
  const [current, setCurrent] = useState<IngredientTypes>(IngredientTypes.bun);
  const ingredientTypesArray = Object.values(IngredientTypes);
  const index = ingredientTypesArray.indexOf(current);
  const rest =
    index === -1 ? ingredientTypesArray : ingredientTypesArray.slice(index);

  const dispatch = useDispatch();
  const currentIngredient = useSelector(getIngredientId);

  const handleOnClose = () => {
    dispatch(removeCurrentIngredientId());
  };
  return (
    <>
      <div className={styles.ingredients}>
        <div className={styles.title}>
          <p>Собери бургер</p>
        </div>
        <div className={styles.menu}>
          {ingredientTypesArray.map((type) => (
            <Tab
              key={type}
              value={type}
              active={current === type}
              onClick={() => setCurrent(type)}
            >
              {AllIngredients[type]}
            </Tab>
          ))}
        </div>

        <section className={styles.list_container}>
          {rest.map((type) => {
            return <IngredientsGroup key={type} type={type} />;
          })}
        </section>
      </div>

      {currentIngredient && (
        <Modal
          isOpen={currentIngredient !== ""}
          title="Детали ингридиента"
          onClose={handleOnClose}
        >
          {currentIngredient && <IngredientDetails />}
        </Modal>
      )}
    </>
  );
};
