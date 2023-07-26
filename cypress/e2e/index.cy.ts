describe('Non Authenticated App Screen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
    cy.clearAllLocalStorage()
  })
  it('Shows login and signup call to action when logged out', () => {
    cy.get('[data-test-id="primary-cta"]')
    cy.get('[data-test-id="secondary-cta"]')
  })
  it('Primary CTA is clickable and shows signup modal', () => {
    cy.get('[data-test-id="primary-cta"]').click()
    cy.get('[data-test-id="signup-modal"]')
  })
  it('Secondary CTA is clickable and shows login modal', () => {
    cy.get('[data-test-id="secondary-cta"]').click()
    cy.get('[data-test-id="login-modal"]')
  })
})
describe('Signup Modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
    cy.clearAllLocalStorage()
  })
  after(() => {
    cy.request('http://localhost:3000/api/v1/db/reset')
  })
  it('Signup form submit button is disabled if inputs are empty', () => {
    cy.get('[data-test-id="primary-cta"]').click()
    cy.get('[data-test-id="signup-submit-button"]').should('be.disabled')
  })
  it('Signup modal allows input and submits', () => {
    cy.get('[data-test-id="primary-cta"]').click()
    cy.get('[data-test-id="signup-first-name-input"]').type('cypress')
    cy.get('[data-test-id="signup-last-name-input"]').type('tests')
    cy.get('[data-test-id="signup-nick-name-input"]').type('tests')
    cy.get('[data-test-id="signup-email-input"]').type('cypresstests@gmail.com')
    cy.get('[data-test-id="signup-password-input"]').type('dev1234')
    cy.get('[data-test-id="signup-confirm-password-input"]').type('dev1234')
    cy.get('[data-test-id="signup-submit-button"]')
      .should('not.be.disabled')
      .click()
    cy.get('[data-test-id="primary-cta"]').should('not.exist')
  })
  it('Login modal allows input and submits', () => {
    cy.get('[data-test-id="secondary-cta"]').click()
    cy.get('[data-test-id="login-submit-button"]').should('be.disabled')
    cy.get('[data-test-id="login-email-input"]').type('cypresstests@gmail.com')
    cy.get('[data-test-id="login-password-input"]').type('dev1234')
    cy.get('[data-test-id="login-submit-button"]')
      .should('not.be.disabled')
      .click()
    cy.get('[data-test-id="secondary-cta"]').should('not.exist')
  })
})
