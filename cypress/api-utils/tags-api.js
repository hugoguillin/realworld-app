const url = Cypress.env('apiUrl')

export default class TagsApi {
  static getPopularTags() {
    return cy
      .request({
        url: url + '/tags',
        headers: {
          Authorization: 'Token ' + Cypress.env('token')
        }
      })
      .its('body.tags')
      .then((tags) => {
        return cy.wrap(tags)
      })
  }
}
