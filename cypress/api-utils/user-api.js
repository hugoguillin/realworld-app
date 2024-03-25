const url = Cypress.env('apiUrl')

export default class UserApi {
  /**
   * Get current user data.
   * Perform login first, in case user data was updated
   * @returns A user object containing the user data
   */
  static getUser(email, password) {
    return cy.request({
      method: 'POST',
      url: `${url}/users/login`,
      body: {
        user: {
          email,
          password
        }
      }
    }).then(response => {
      return cy.request({
        method: 'GET',
        headers: {
          Authorization: 'Token ' + response.body.user.token
        },
        url: `${url}/user`,
      }).then((user) => {
        return user.body.user
      })
    })

  }
}