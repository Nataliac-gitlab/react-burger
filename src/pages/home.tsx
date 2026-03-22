import React from "react";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import styles from "./home.module.css";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { useGetIngredientItemsQuery } from "../components/burger-ingredients/services/ingredients-api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const Home = () => {
  const { isError, isLoading } = useGetIngredientItemsQuery();

  if (isLoading) return <span>Щас всё будет...</span>;
  if (isError) return <span>Ooops... чё-то не идёт :(</span>;

  return (
    <div className={styles.app}>
      <section className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </section>
    </div>
  );
};
