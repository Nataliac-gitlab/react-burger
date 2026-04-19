import reducer, { setBurgerIngredients, initialState } from "./slice";
import { IngredientItemType } from "../../../common/types";

const ingredients: IngredientItemType = {
  _id: "60666c42cc7b410027a1a9b1",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 44,
  calories: 420,
  price: 1234,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

describe("Burger ingredients reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setBurgerIngredients", () => {
    const ingredientsById = { [ingredients._id]: ingredients };
    const action = setBurgerIngredients([ingredients]);
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredientsById: ingredientsById,
    });
  });
});
