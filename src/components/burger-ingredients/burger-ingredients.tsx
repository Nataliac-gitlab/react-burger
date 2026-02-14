import React, { useState, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientTypes, IngredientTitles } from "../../common/types";
import { IngredientsGroup } from "./ingredients-group/ingredient-group";
import styles from "./burger-ingredients.module.css";

export const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState<IngredientTypes>(
    IngredientTypes.bun,
  );
  const ingredientTypesArray = Object.values(IngredientTypes);

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const tabsRef = {
    [IngredientTypes.bun]: bunRef,
    [IngredientTypes.sauce]: sauceRef,
    [IngredientTypes.main]: mainRef,
  };

  const handleTabClick = (type: string) => {
    const ingredientType = type as IngredientTypes;
    setActiveTab(ingredientType);
    tabsRef[ingredientType].current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const containerTop = e.currentTarget.getBoundingClientRect().top;

    const bunDiff = Math.abs(
      tabsRef[IngredientTypes.bun].current!.getBoundingClientRect().top -
        containerTop,
    );
    const sauceDiff = Math.abs(
      tabsRef[IngredientTypes.sauce].current!.getBoundingClientRect().top -
        containerTop,
    );
    const mainDiff = Math.abs(
      tabsRef[IngredientTypes.main].current!.getBoundingClientRect().top -
        containerTop,
    );

    const minDiff = Math.min(bunDiff, sauceDiff, mainDiff);

    if (minDiff === bunDiff) setActiveTab(IngredientTypes.bun);
    else if (minDiff === sauceDiff) setActiveTab(IngredientTypes.sauce);
    else setActiveTab(IngredientTypes.main);
  };

  return (
    <div className={styles.ingredients}>
      <div className={styles.title}>
        <p>Собери бургер</p>
      </div>
      <div className={styles.menu}>
        {ingredientTypesArray.map((type) => (
          <Tab
            key={type}
            value={type}
            active={activeTab === type}
            onClick={handleTabClick}
          >
            {IngredientTitles[type]}
          </Tab>
        ))}
      </div>

      <section className={styles.list_container} onScroll={handleScroll}>
        {ingredientTypesArray.map((type) => (
          <div key={type} ref={tabsRef[type]}>
            <IngredientsGroup key={type} type={type} />
          </div>
        ))}
      </section>
    </div>
  );
};
