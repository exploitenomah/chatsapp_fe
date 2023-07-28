// describe('Home page without authentication', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3001')
//     cy.clearAllLocalStorage()
//   })
//   it('Shows login and signup call to action when logged out', () => {
//     cy.dataTestIdCy('primary-cta')
//     cy.dataTestIdCy('secondary-cta')
//   })
//   it('Primary CTA is clickable and shows signup modal', () => {
//     cy.dataTestIdCy('primary-cta').click()
//     cy.dataTestIdCy('signup-modal')
//   })
//   it('Secondary CTA is clickable and shows login modal', () => {
//     cy.dataTestIdCy('secondary-cta').click()
//     cy.dataTestIdCy('login-modal')
//   })
// })
// describe('Signup And Login Modals', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3001')
//     cy.clearAllLocalStorage()
//   })
// })
