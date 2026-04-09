describe("burger ingredients modal test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept("GET", "api/ingredients", {
      fixture: "data/ingredients.json",
    });
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

    cy.get(`[data-testid=ingredient_${bunId}]`).as("bun");
    cy.get("@bun").trigger("dragstart");
    cy.get("[data-testid=burger_constructor]").trigger("drop");
    cy.get(`[data-testid=counter_${bunId}]`).contains("2").should("exist");
    cy.get(`[data-testid=top_bun_${bunId}]`).should("exist");
    cy.get(`[data-testid=bottom_bun_${bunId}]`).should("exist");

    cy.get(`[data-testid=ingredient_${topping1}]`).as("topping1");
    cy.get("@topping1").trigger("dragstart");
    cy.get("[data-testid=burger_constructor]").trigger("drop");
    cy.get(`[data-testid=counter_${topping1}]`).contains("1").should("exist");
    cy.get(`[data-testid=topping_${topping1}]`).should("exist");

    cy.get(`[data-testid=ingredient_${topping2}]`).as("topping2");
    cy.get("@topping2").trigger("dragstart");
    cy.get("[data-testid=burger_constructor]").trigger("drop");
    cy.get(`[data-testid=counter_${topping2}]`).contains("1").should("exist");
    cy.get(`[data-testid=topping_${topping2}]`).should("exist");

    cy.get("[data-testid=create_order]").click();
    cy.get(`[class^=modal_header] [xmlns="http://www.w3.org/2000/svg"]`)
      .as("cross")
      .should("exist");
    cy.get("[data-testid=order]").contains(order).should("exist");
  });
});
