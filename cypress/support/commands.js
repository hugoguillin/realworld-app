// ***********************************************
// This example commands.js shows you how to
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

let apiUrl = Cypress.env('apiUrl')

Cypress.Commands.add('loginViaUI', (email, password) => {
  cy.visit('/login')
  cy.getByTestId("email").type(email)
  cy.getByTestId("password").type(password + '{enter}')
  cy.getByTestId("home").should('be.visible')
})

Cypress.Commands.add('loginWithSession', (email, password) => {
  cy.session([email, password], () => {
    cy.loginViaApi(email, password).then(response => {
      const userSession = {
        headers: {
          Authorization: `Token ${response.body.user.token}`
        },
        isAuth: true,
        loggedUser: JSON.stringify(response.body.user)
      }
      localStorage.setItem('loggedUser', JSON.stringify(userSession))
    })
  })
})
Cypress.Commands.add('loginViaApi', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${apiUrl}/users/login`,
    body: {
      user: {
        email,
        password
      }
    }
  }).then(response => {
    expect(response.status).to.eq(200)
    Cypress.env('token', response.body.user.token)
  })
})

Cypress.Commands.add('setResolution', size => {
  cy.viewport(size[0], size[1])
})

Cypress.Commands.add('giveLikeToAnArticle', (index = 0) => {
  cy.getByTestId("fav-button").eq(index).click()
})

Cypress.Commands.add('getByTestId', id => {
  return cy.get(`[data-testid=${id}]`)
})
