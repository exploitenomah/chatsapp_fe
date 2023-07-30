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

describe.only('Form Errors', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
    cy.clearAllLocalStorage()
  })
  after(() => {
    cy.request('http://localhost:3000/api/v1/db/reset')
    cy.clearAllLocalStorage()
  })
  it('User is notified of non matching password', () => {
    cy.dataTestIdCy('primary-cta').click()
    cy.dataTestIdCy('signup-password-input').type('password')
    cy.dataTestIdCy('signup-confirm-password-input').type('confirmPassword')
    cy.dataTestIdCy('signup-password-error').should('exist')
  })
  it.only('User is notified of taken nickName and email', () => {
    cy.fixture('users').then((usersFixture) => {
      cy.signup(usersFixture.users[0])
      cy.clearAllLocalStorage()
      cy.reload(true)
      cy.dataTestIdCy('primary-cta').click()
      cy.dataTestIdCy('signup-nick-name-input').type(
        usersFixture.users[0].nickName,
      )
      cy.dataTestIdCy('signup-email-input').type(usersFixture.users[0].email)
      cy.wait(500).then(() => {
        cy.dataTestIdCy('signup-email-error').should('exist')
        cy.dataTestIdCy('signup-nick-name-error').should('exist')
      })
    })
  })
  it('User is notified of invalid nick name', () => {
    cy.dataTestIdCy('primary-cta').click()

    cy.dataTestIdCy('signup-nick-name-input').clear()
    cy.dataTestIdCy('signup-nick-name-error').should('not.exist')
    cy.dataTestIdCy('signup-nick-name-input').type('.invalid.,/nickname')
    cy.dataTestIdCy('signup-nick-name-error').should('exist')
  })
})

describe('Signup And Login Modals', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
    cy.clearAllLocalStorage()
  })
  afterEach(() => {
    cy.request('http://localhost:3000/api/v1/db/reset')
    cy.clearAllLocalStorage()
  })
  it('Signup form submit button is disabled if inputs are empty', () => {
    cy.dataTestIdCy('primary-cta').click()
    cy.dataTestIdCy('signup-submit-button').should('be.disabled')
  })
  it('Login form submit button is disabled if inputs are empty', () => {
    cy.dataTestIdCy('secondary-cta').click()
    cy.dataTestIdCy('login-submit-button').should('be.disabled')
  })
  it('Allows form type toggle', () => {
    cy.dataTestIdCy('secondary-cta').click()
    cy.dataTestIdCy('login-submit-button').should('exist')
    cy.dataTestIdCy('form-type-toggle').click()
    cy.dataTestIdCy('login-submit-button').should('not.exist')
    cy.dataTestIdCy('signup-submit-button').should('exist')
  })
  it('Signup modal allows input and submits', () => {
    cy.fixture('users').then((usersFixture) => {
      cy.signup(usersFixture.users[0])
    })
    cy.dataTestIdCy('primary-cta').should('not.exist')
  })
  it('Should Login', () => {
    cy.fixture('users').then((usersFixture) => {
      cy.signup(usersFixture.users[0])
      cy.clearAllLocalStorage()
      cy.reload()
    })
    cy.login('cypresstests@gmail.com', 'dev1234')
    cy.dataTestIdCy('secondary-cta').should('not.exist')
  })
})
