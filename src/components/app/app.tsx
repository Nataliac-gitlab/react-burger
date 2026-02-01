import React, { useEffect } from "react";

import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

import { useGetIngredientItemsQuery } from "../../servives/api";

import { useDispatch } from "react-redux";
import { setBurgerIngredients } from "../burger-ingredients/services/slice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const {
    data = [],
    isError,
    isLoading,
    isSuccess,
  } = useGetIngredientItemsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setBurgerIngredients(data));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
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
}

export default App;
