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
Cypress.Commands.add('login', (email, password) => {
  cy.clearAllLocalStorage()
  cy.dataTestIdCy('secondary-cta').click()
  cy.dataTestIdCy('login-submit-button').should('be.disabled')
  cy.dataTestIdCy('login-email-input').type(email)
  cy.dataTestIdCy('login-password-input').type(password)
  cy.dataTestIdCy('login-submit-button').should('not.be.disabled').click()
})
Cypress.Commands.add('signup', (data) => {
  const { firstName, lastName, nickName, email, password, confirmPassword } =
    data
  cy.clearAllLocalStorage()
  cy.dataTestIdCy('primary-cta').click()
  cy.dataTestIdCy('signup-first-name-input').type(firstName)
  cy.dataTestIdCy('signup-last-name-input').type(lastName)
  cy.dataTestIdCy('signup-nick-name-input').type(nickName)
  cy.dataTestIdCy('signup-email-input').type(email)
  cy.dataTestIdCy('signup-password-input').type(password)
  cy.dataTestIdCy('signup-confirm-password-input').type(confirmPassword)
  cy.dataTestIdCy('signup-submit-button').should('not.be.disabled').click()
})

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
Cypress.Commands.add('dataTestIdCy', (selector, ...args) => {
  return cy.get(`[data-test-id=${selector}]`, ...args)
})
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

//   }
// }
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      signup(data: {
        firstName: string
        lastName: string
        nickName: string
        email: string
        password: string
        confirmPassword: string
      }): Chainable<void>
      drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      dismiss(
        subject: string,
        options?: Partial<TypeOptions>,
      ): Chainable<Element>
      visit(
        originalFn: CommandOriginalFn<keyof Chainable<Element>>,
        url: string,
        options: Partial<VisitOptions>,
      ): Chainable<Element>
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataTestIdCy(value: string): Chainable<JQuery<HTMLElement>>
    }
  }
}

export {}
