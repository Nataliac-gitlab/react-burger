describe("burgeк ingredients order test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept("GET", "api/ingredients", {
      fixture: "data/ingredients.json",
    });
  });

  it("should open ingredient modal", () => {
    const bunId = "643d69a5c3f7b9001cfa093d";
    cy.get(`[data-testid=ingredient_${bunId}]`).as("bun");
    cy.get("@bun").click();
    cy.get("#modals").should("exist");
    cy.get(`[data-testid=details_${bunId}]`).should("exist");
  });

  it("should close ingredient modal by clickin modal cross", () => {
    const bunId = "643d69a5c3f7b9001cfa093d";
    cy.get(`[data-testid=ingredient_${bunId}]`).as("bun");
    cy.get("@bun").click();
    cy.get(`[data-testid=details_${bunId}]`).should("exist");

    cy.get(`[class^=modal_header] [xmlns="http://www.w3.org/2000/svg"]`)
      .as("cross")
      .should("exist");
    cy.get("@cross").click();
    cy.get("@cross").should("not.exist");
    cy.get(`[data-testid=details_${bunId}]`).should("not.exist");
  });

  it("should close ingredient modal by clicking modal overlay", () => {
    const bunId = "643d69a5c3f7b9001cfa093d";
    cy.get(`[data-testid=ingredient_${bunId}]`).as("bun");
    cy.get("@bun").click();
    cy.get(`[data-testid=details_${bunId}]`).should("exist");

    cy.get("[class^=modal-overlay]").as("overlay").should("exist");
    cy.get("@overlay").click("topLeft");
    cy.get("@overlay").should("not.exist");
    cy.get(`[data-testid=details_${bunId}]`).should("not.exist");
  });
});
