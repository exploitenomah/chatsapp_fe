describe('Home page without authentication', () => {
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
    cy.signup({
      email: 'cypresstests@gmail.com',
      firstName: 'cypress',
      lastName: 'tests',
      nickName: 'tests',
      password: 'dev1234',
      confirmPassword: 'dev1234',
    })
    cy.dataTestIdCy('primary-cta').should('not.exist')
  })
  it('Should Login', () => {
    cy.login('cypresstests@gmail.com', 'dev1234')
    cy.dataTestIdCy('secondary-cta').should('not.exist')
  })
})
