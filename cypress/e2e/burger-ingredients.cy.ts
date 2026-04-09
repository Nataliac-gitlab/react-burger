describe("burgeк ingredients test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept("GET", "api/ingredients", {
      fixture: "data/ingredients.json",
    });
  });

  it("should open constructor page by default", () => {
    cy.get("[data-testid=build_burger]")
      .contains("Собери бургер")
      .should("exist");
    cy.get("[data-testid=burger_constructor]").should("exist");
  });

  it("should drag-and-drop a bun", () => {
    const bunId = "643d69a5c3f7b9001cfa093d";
    cy.get(`[data-testid=ingredient_${bunId}]`).as("bun");
    cy.get("@bun").trigger("dragstart");
    cy.get("[data-testid=burger_constructor]").trigger("drop");
    cy.get(`[data-testid=counter_${bunId}]`).contains("2").should("exist");
    cy.get(`[data-testid=top_bun_${bunId}]`).should("exist");
    cy.get(`[data-testid=bottom_bun_${bunId}]`).should("exist");
  });

  it("should drag-and-drop different toppings", () => {
    const topping1 = "643d69a5c3f7b9001cfa0941";
    const topping2 = "643d69a5c3f7b9001cfa093e";
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
  });

  it("should add one and the same toppings", () => {
    const topping = "643d69a5c3f7b9001cfa0941";

    cy.get(`[data-testid=ingredient_${topping}]`).as("topping");
    cy.get("@topping").trigger("dragstart");
    cy.get("[data-testid=burger_constructor]").trigger("drop");
    cy.get(`[data-testid=counter_${topping}]`).contains("1").should("exist");

    cy.get("@topping").trigger("dragstart");
    cy.get("[data-testid=burger_constructor]").trigger("drop");
    cy.get(`[data-testid=counter_${topping}]`).contains("2").should("exist");

    cy.get(`[data-testid=topping_${topping}]`).should("have.length", 2);
  });
});
