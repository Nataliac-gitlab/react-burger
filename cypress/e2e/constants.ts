export const testUrl = "http://localhost:3000";

export const selectors = {
  constructor: "[data-testid=burger_constructor]",
  ingredient: (id: string) => `[data-testid=ingredient_${id}]`,
  counter: (id: string) => `[data-testid=counter_${id}]`,
  topBun: (id: string) => `[data-testid=top_bun_${id}]`,
  bottomBun: (id: string) => `[data-testid=bottom_bun_${id}]`,
  topping: (id: string) => `[data-testid=topping_${id}]`,
  title: "[data-testid=build_burger]",
  details: (id: string) => `[data-testid=details_${id}]`,
};
