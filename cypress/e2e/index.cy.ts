describe('Non Authenticated App Screen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
    cy.clearAllLocalStorage()
  })
  it('Shows login and signup call to action when logged out', () => {
    cy.get('[data-test-id="primary-cta"]')
    cy.get('[data-test-id="secondary-cta"]')
  })
})
