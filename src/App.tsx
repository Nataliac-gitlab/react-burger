import React, { useEffect, useState } from "react";

import { AppHeader } from "./components/app-header/app-header";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredients";
import { apiURL } from "./common/constants";

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
    <div>
      <AppHeader />
      {isLoading && <span>Щас всё будет...</span>}
      {hasError && <span>Ooops... чё-то не идёт :(</span>}
      {!isLoading && !hasError && <BurgerIngredients data={data} />}
    </div>
  );
}

export default App;
