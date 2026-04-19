import { testUrl, selectors } from "./constants";
import "../support/commands";

const bunId = "643d69a5c3f7b9001cfa093d";

describe("burger ingredients order test", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/ingredients", {
      fixture: "data/ingredients.json",
    }).as("getIngredients");
    cy.visit(testUrl);
    cy.wait("@getIngredients");
  });

  it("should open ingredient modal", () => {
    cy.openIngredientModal(bunId);
    cy.assertIngredientModalIsPresent(bunId);
  });

  it("should close ingredient modal by clickin modal cross", () => {
    cy.openIngredientModal(bunId);
    cy.assertIngredientModalIsPresent(bunId);

    cy.get(`[class^=modal_header] [xmlns="http://www.w3.org/2000/svg"]`)
      .as("cross")
      .should("exist");
    cy.get("@cross").click();
    cy.get("@cross").should("not.exist");
    cy.assertIngredientModalIsNotPresent(bunId);
  });

  it("should close ingredient modal by clicking modal overlay", () => {
    cy.openIngredientModal(bunId);

    cy.get("[class^=modal-overlay]").as("overlay").should("exist");
    cy.get("@overlay").click("topLeft");
    cy.get("@overlay").should("not.exist");
    cy.assertIngredientModalIsNotPresent(bunId);
  });
});
