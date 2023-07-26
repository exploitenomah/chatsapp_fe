describe('Non Authenticated App Screen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
    cy.clearAllLocalStorage()
  })
  it('Shows login and signup call to action when logged out', () => {
    cy.dataTestIdCy('primary-cta')
    cy.dataTestIdCy('secondary-cta')
  })
  it('Primary CTA is clickable and shows signup modal', () => {
    cy.dataTestIdCy('primary-cta').click()
    cy.dataTestIdCy('signup-modal')
  })
  it('Secondary CTA is clickable and shows login modal', () => {
    cy.dataTestIdCy('secondary-cta').click()
    cy.dataTestIdCy('login-modal')
  })
})
describe('Signup And Login Modals', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
    cy.clearAllLocalStorage()
  })
  after(() => {
    cy.request('http://localhost:3000/api/v1/db/reset')
    cy.clearAllLocalStorage()
  })
  it('Signup form submit button is disabled if inputs are empty', () => {
    cy.dataTestIdCy('primary-cta').click()
    cy.dataTestIdCy('signup-submit-button').should('be.disabled')
  })
  it('Signup modal allows input and submits', () => {
    cy.dataTestIdCy('primary-cta').click()
    cy.dataTestIdCy('signup-first-name-input').type('cypress')
    cy.dataTestIdCy('signup-last-name-input').type('tests')
    cy.dataTestIdCy('signup-nick-name-input').type('tests')
    cy.dataTestIdCy('signup-email-input').type('cypresstests@gmail.com')
    cy.dataTestIdCy('signup-password-input').type('dev1234')
    cy.dataTestIdCy('signup-confirm-password-input').type('dev1234')
    cy.dataTestIdCy('signup-submit-button').should('not.be.disabled').click()
    cy.dataTestIdCy('primary-cta').should('not.exist')
  })
  it('Login modal allows input and submits', () => {
    cy.dataTestIdCy('secondary-cta').click()
    cy.dataTestIdCy('login-submit-button').should('be.disabled')
    cy.dataTestIdCy('login-email-input').type('cypresstests@gmail.com')
    cy.dataTestIdCy('login-password-input').type('dev1234')
    cy.dataTestIdCy('login-submit-button').should('not.be.disabled').click()
    cy.dataTestIdCy('secondary-cta').should('not.exist')
  })
})
