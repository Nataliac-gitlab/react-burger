import { selectors } from "../e2e/constants";
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add("dragToConstructor", (ingredientId: string) => {
  cy.get(selectors.ingredient(ingredientId)).trigger("dragstart");
  cy.get(selectors.constructor).trigger("drop");
});

Cypress.Commands.add("openIngredientModal", (id: string) => {
  cy.get(selectors.ingredient(id)).as("ingredient");
  cy.get("@ingredient").click();
  cy.get("#modals").should("exist");
});

Cypress.Commands.add("assertIngredientModalIsPresent", (id: string) => {
  cy.get(selectors.details(id)).should("exist");
});

Cypress.Commands.add("assertIngredientModalIsNotPresent", (id: string) => {
  cy.get(selectors.details(id)).should("not.exist");
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
