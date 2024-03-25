const url = Cypress.env('apiUrl')

export default class CommonApi {
  static registerNewUser(user) {
    return cy.request('POST', `${url}/users`, { user }).then(response => {
      expect(response.status).to.eq(201)
      return response.body.user
    })
  }
}