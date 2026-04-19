import { testUrl, selectors } from "./constants";
import "../support/commands";

describe("burger ingredients modal test", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/ingredients", {
      fixture: "data/ingredients.json",
    }).as("getIngredients");
    cy.visit(testUrl);
    cy.wait("@getIngredients");
    cy.intercept("POST", "api/orders", {
      fixture: "data/order.json",
    });

    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken"),
    );
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify("test-accessToken"),
    );
  });

  it("should create an order", () => {
    const bunId = "643d69a5c3f7b9001cfa093d";
    const topping1 = "643d69a5c3f7b9001cfa0941";
    const topping2 = "643d69a5c3f7b9001cfa093e";
    const order = "65536";

    cy.dragToConstructor(bunId);
    cy.get(selectors.counter(bunId)).contains("2");
    cy.get(selectors.topBun(bunId)).should("exist");
    cy.get(selectors.bottomBun(bunId)).should("exist");
    cy.dragToConstructor(topping1);
    cy.get(selectors.counter(topping1)).contains("1").should("exist");
    cy.get(selectors.topping(topping1)).should("exist");
    cy.dragToConstructor(topping2);
    cy.get(selectors.counter(topping2)).contains("1").should("exist");
    cy.get(selectors.topping(topping2)).should("exist");

    cy.get("[data-testid=create_order]").click();
    cy.get(`[class^=modal_header] [xmlns="http://www.w3.org/2000/svg"]`)
      .as("cross")
      .should("exist");
    cy.get("[data-testid=order]").contains(order).should("exist");
  });
});
