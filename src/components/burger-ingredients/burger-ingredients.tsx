import React, { useState } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { AllIngredients, IngredientTypes } from "../../common/types";
import { IngredientsGroup } from "./ingredients-group/ingredient-group";
import styles from "./burger-ingredients.module.css";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

const getScrollHeight = (windowHeight: number): number => {
  return Math.max(200, windowHeight - 300);
};

export const BurgerIngredients = () => {
  const [current, setCurrent] = useState<IngredientTypes>(IngredientTypes.bun);
  const ingredientsArr = Object.values(IngredientTypes);
  const index = ingredientsArr.indexOf(current);
  const rest = index === -1 ? ingredientsArr : ingredientsArr.slice(index);

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  console.log(`Размер области просмотра: ${windowWidth}x${windowHeight}`);

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
              return <IngredientsGroup key={index} type={item} />;
            })}
          </section>
        </div>

        <BurgerConstructor />
      </div>
    </>
  );
};
