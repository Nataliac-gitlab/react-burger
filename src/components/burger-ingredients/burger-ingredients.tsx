import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import {
  AllIngredients,
  IngredientItemType,
  IngredientTypes,
} from "../../common/types";
import { IngredientsGroup } from "./ingredients-group/ingredient-group";
import styles from "./burger-ingredients.module.css";
import { Modal } from "../shared/modal/modal";
import { IngredientDetails } from "./ingredient-details/ingredient-details";

type BurgerIngredientsProps = {
  data: IngredientItemType[];
};

export const BurgerIngredients = ({ data }: BurgerIngredientsProps) => {
  const [current, setCurrent] = useState<IngredientTypes>(IngredientTypes.bun);
  const ingredientTypesArray = Object.values(IngredientTypes);
  const index = ingredientTypesArray.indexOf(current);
  const rest =
    index === -1 ? ingredientTypesArray : ingredientTypesArray.slice(index);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState<
    IngredientItemType | undefined
  >(undefined);

  const handleOnClick = (item: IngredientItemType) => {
    if (isOpen) {
      return;
    }
    setIsOpen(true);
    setCurrentIngredient(item);
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
            return (
              <IngredientsGroup
                key={type}
                type={type}
                data={data}
                onClick={handleOnClick}
              />
            );
          })}
        </section>
      </div>

      {currentIngredient && isOpen && (
        <Modal
          isOpen={isOpen}
          title="Детали ингридиента"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          {currentIngredient && (
            <IngredientDetails details={currentIngredient} />
          )}
        </Modal>
      )}
    </>
  );
};
