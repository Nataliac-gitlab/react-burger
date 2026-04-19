import { testUrl, selectors } from "./constants";
import "../support/commands";

const ingredients = {
  bun: "643d69a5c3f7b9001cfa093d",
  topping1: "643d69a5c3f7b9001cfa0941",
  topping2: "643d69a5c3f7b9001cfa093e",
};
describe("burger ingredients test", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/ingredients", {
      fixture: "data/ingredients.json",
    }).as("getIngredients");
    cy.visit(testUrl);
    cy.wait("@getIngredients");
  });

  it("should open constructor page by default", () => {
    cy.get(selectors.title).contains("Собери бургер");
    cy.get(selectors.constructor).should("be.visible");
  });

  it("should drag-and-drop a bun", () => {
    const id = ingredients.bun;

    cy.dragToConstructor(id);

    cy.get(selectors.counter(id)).contains("2").should("exist");
    cy.get(selectors.topBun(id)).should("exist");
    cy.get(selectors.bottomBun(id)).should("exist");
  });

  it("should drag-and-drop different toppings", () => {
    const id1 = ingredients.topping1;
    const id2 = ingredients.topping2;

    cy.dragToConstructor(id1);

    cy.get(selectors.counter(id1)).contains("1");
    cy.get(selectors.topping(id1)).should("exist");

    cy.dragToConstructor(id2);

    cy.get(selectors.counter(id2)).contains("1");
    cy.get(selectors.topping(id2)).should("exist");
  });

  it("should add one and the same toppings", () => {
    const id = ingredients.topping1;

    cy.dragToConstructor(id);

    cy.get(selectors.counter(id)).contains("1");
    cy.get(selectors.topping(id)).should("exist");

    cy.dragToConstructor(id);

    cy.get(selectors.counter(id)).contains("2");
    cy.get(selectors.topping(id)).should("have.length", 2);
  });
});
