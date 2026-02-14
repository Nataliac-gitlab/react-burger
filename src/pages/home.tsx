import React, { useEffect } from "react";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import styles from "./home.module.css";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { useGetIngredientItemsQuery } from "../servives/api";
import { setBurgerIngredients } from "../components/burger-ingredients/services/slice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppDispatch } from "../servives/hooks";

export const Home = () => {
  const {
    data = [],
    isError,
    isLoading,
    isSuccess,
  } = useGetIngredientItemsQuery();
  const dispatch = useAppDispatch(); //useDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setBurgerIngredients(data));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div className={styles.app}>
      {isLoading && <span>Щас всё будет...</span>}
      {isError && <span>Ooops... чё-то не идёт :(</span>}
      {!isLoading && !isError && (
        <section className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </section>
      )}
    </div>
  );
};
