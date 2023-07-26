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
