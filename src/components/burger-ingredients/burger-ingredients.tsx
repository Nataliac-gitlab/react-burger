import React, { useEffect, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import {
  AllIngredients,
  IngredientItemType,
  IngredientTypes,
} from "../../common/types";
import { IngredientsGroup } from "./ingredients-group/ingredient-group";
import styles from "./burger-ingredients.module.css";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Modal } from "../shared/modal/modal";
import { IngredientDetails } from "./ingredient-details/ingredient-details";

const getScrollHeight = (windowHeight: number): number => {
  return Math.max(200, windowHeight - 300);
};

type BurgerIngredientsProps = {
  data: IngredientItemType[];
};

export const BurgerIngredients = ({ data }: BurgerIngredientsProps) => {
  const [current, setCurrent] = useState<IngredientTypes>(IngredientTypes.bun);
  const ingredientsArr = Object.values(IngredientTypes);
  const index = ingredientsArr.indexOf(current);
  const rest = index === -1 ? ingredientsArr : ingredientsArr.slice(index);

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
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.ingredients_menu}>
          <div className={styles.title}>
            <p>Собери бургер</p>
          </div>
          <div style={{ display: "flex" }}>
            <Tab
              value={IngredientTypes.bun}
              active={current === IngredientTypes.bun}
              onClick={() => setCurrent(IngredientTypes.bun)}
            >
              {AllIngredients[IngredientTypes.bun]}
            </Tab>
            <Tab
              value={IngredientTypes.sauce}
              active={current === IngredientTypes.sauce}
              onClick={() => setCurrent(IngredientTypes.sauce)}
            >
              {AllIngredients[IngredientTypes.sauce]}
            </Tab>
            <Tab
              value={IngredientTypes.main}
              active={current === IngredientTypes.main}
              onClick={() => setCurrent(IngredientTypes.main)}
            >
              {AllIngredients[IngredientTypes.main]}
            </Tab>
          </div>

          <section
            className={styles.list_container}
            style={{ height: getScrollHeight(windowHeight) }}
          >
            {rest.map((item, index) => {
              return (
                <IngredientsGroup
                  key={index}
                  type={item}
                  data={data}
                  onClick={handleOnClick}
                />
              );
            })}
          </section>
        </div>

        <BurgerConstructor />
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
      </div>
    </>
  );
};
