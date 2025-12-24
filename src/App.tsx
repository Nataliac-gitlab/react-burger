import React from "react";

import { AppHeader } from "./components/app-header/app-header";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredients";

function App() {
  return (
    <div>
      <AppHeader />
      <BurgerIngredients />
    </div>
  );
}

export default App;
