if (!global.crypto) {
  // @ts-ignore
  global.crypto = {
    randomUUID: () => "test-uuid-1234-5678-1234567890ab" as any,
  };
}

import reducer, {
  addBun,
  addTopping,
  clearBurgerConstructor,
  initialState,
  moveTopping,
  removeToppingByIndex,
  removeOrder,
  setOrder,
  BurgerConstructorState,
  Topping,
} from "./slice";

describe("Burger constructor reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle addBun", () => {
    const bun = "qwerty";
    const action = addBun(bun);
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, bun });
  });

  it("should handle addTopping", () => {
    const id = "asdf";
    const action = addTopping(id);
    const state = reducer(initialState, action);
    expect(state.toppings).toHaveLength(1);
    expect(state.toppings[0].id).toEqual(id);
  });

  it("should handle removeToppingByIndex", () => {
    const toppings: Topping[] = [
      {
        id: "0",
        uuid: "dfgfghj",
      },
      {
        id: "1",
        uuid: "hjgjg",
      },
    ];
    const action = removeToppingByIndex(1);
    const state = reducer({ ...initialState, toppings }, action);
    expect(state).toEqual({
      ...initialState,
      toppings: [
        {
          id: "0",
          uuid: "dfgfghj",
        },
      ],
    });
  });

  it("should handle moveTopping", () => {
    const toppings: Topping[] = [
      {
        id: "0",
        uuid: "dfgfghj",
      },
      {
        id: "1",
        uuid: "hjgjg",
      },
      {
        id: "2",
        uuid: "vjhki",
      },
    ];
    const action = moveTopping({ fromIndex: 2, toIndex: 0 });
    const state = reducer({ ...initialState, toppings }, action);
    expect(state).toEqual({
      ...initialState,
      toppings: [
        {
          id: "2",
          uuid: "vjhki",
        },
        {
          id: "0",
          uuid: "dfgfghj",
        },
        {
          id: "1",
          uuid: "hjgjg",
        },
      ],
    });
  });

  it("should handle setOrder", () => {
    const order = 12345;
    const action = setOrder(order);
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, order });
  });

  it("should handle removeOrder", () => {
    const order = 12345;
    const action = removeOrder();
    const state = reducer({ ...initialState, order }, action);
    expect(state).toEqual({ ...initialState });
  });

  it("should handle clearBurgerConstructor", () => {
    const prevState: BurgerConstructorState = {
      ...initialState,
      bun: "bunId",
      toppings: [
        {
          id: "0",
          uuid: "dfgfghj",
        },
        {
          id: "1",
          uuid: "hjgjg",
        },
        {
          id: "2",
          uuid: "vjhki",
        },
      ],
      order: 12345,
    };
    const action = clearBurgerConstructor();
    const state = reducer(prevState, action);
    expect(state).toEqual({ ...initialState });
  });
});
