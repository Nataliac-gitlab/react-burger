import React, { useEffect, useState } from "react";

import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { apiURL } from "../../common/constants";
import styles from "./app.module.css";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: null,
    data: [],
  });

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      setState({
        ...state,
        isLoading: true,
        hasError: null,
      });
      try {
        const res = await fetch(apiURL, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }
        const result = await res.json();
        setState({
          ...state,
          isLoading: false,
          data: result.data,
        });
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setState({
            ...state,
            isLoading: false,
            hasError: err.message,
          });
        }
      }
    };
    getData();
    return () => {
      controller.abort();
    };
  }, []);

  const { data, isLoading, hasError } = state;

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading && <span>Щас всё будет...</span>}
      {hasError && <span>Ooops... чё-то не идёт :(</span>}
      {!isLoading && !hasError && (
        <section className={styles.main}>
          <BurgerIngredients data={data} />
          <BurgerConstructor />
        </section>
      )}
    </div>
  );
}

export default App;
