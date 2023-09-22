describe.only('Desktop App', () => {
  before(() => {
    cy.request('http://localhost:3000/api/v1/db/seed')
  })
  after(() => {
    cy.request('http://localhost:3000/api/v1/db/reset')
    cy.clearAllLocalStorage()
    cy.home()
  })
  beforeEach(() => {
    cy.home()
    cy.fixture('users').then((usersFixture) => {
      cy.login(usersFixture.users[0].email, usersFixture.users[0].password)
    })
  })
  afterEach(() => {
    cy.clearLocalStorage()
  })
  it('Left Panel is present and contains header, user avatar and app options', () => {
    cy.dataTestIdCy('left-panel-desktop')
      .dataTestIdCy('app-header')
      .dataTestIdCy('header-user-avatar')
      .dataTestIdCy('header-friends-btn')
      .dataTestIdCy('header-logout-btn')
      .dataTestIdCy('header-options')
  })
  it('User Header Avatar is clickable and toggles user profile panel', () => {
    cy.fixture('users').then((usersFixture) => {
      console.log(usersFixture.users, 'ojhgf')
      cy.dataTestIdCy('authenticated-user-drawer').should('not.exist')
      cy.dataTestIdCy('header-user-avatar').click()
      cy.dataTestIdCy('authenticated-user-drawer').should('exist')
      cy.dataTestIdCy('authenticated-user-nickName')
        .should('exist')
        .contains(usersFixture.users[0].nickName)
      cy.dataTestIdCy('authenticated-user-firstName')
        .should('exist')
        .contains(usersFixture.users[0].firstName)
      cy.dataTestIdCy('authenticated-user-lastName')
        .should('exist')
        .contains(usersFixture.users[0].lastName)
      cy.dataTestIdCy('authenticated-user-about')
        .should('exist')
        .contains(usersFixture.users[0].about)
    })
  })
})


export {}