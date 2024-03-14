import ArticlesApi from './article-api'

const url = Cypress.env('apiUrl')
export default class AuthorApi {
  static unfollowAuthor(articleIndex) {
    ArticlesApi.getArticles().then(articles => {
      const authorName = articles[articleIndex].author.username
      const encodedAuthorName = encodeURIComponent(authorName)
      cy.request({
        method: 'DELETE',
        url: `${url}/profiles/${encodedAuthorName}/follow`,
        headers: {
          Authorization: 'Token ' + Cypress.env('token')
        }
      })
    })
  }
}
