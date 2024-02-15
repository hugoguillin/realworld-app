import ArticlesApi from '../api-utils/article-api'
const url = Cypress.env('apiUrl')

export default class FavoritesApi {
  static getUserFavorites(username) {
    return cy
      .request(`${url}/articles?favorited=${username}`)
      .then(response => {
        return response.body.articles
      })
  }

  /**
   * Check if the selected article was already favorited by the user
   * If so, removes that favorite from the article
   * @param index Index of the article selected for the test
   */
  static unfavoriteArticle(index = 0) {
    let slug = ''
    let finalSlug
    ArticlesApi.getArticles()
      .then(articles => {
        slug = articles[index].slug
      })
      .then(() => {
        // cy.fixture('loginData').then(loginData => {
          this.getUserFavorites(Cypress.env("username")).then(article => {
            article.forEach(a => {
              if (a.slug === slug) {
                finalSlug = slug
              }
            })
          })
        // })
      })
      .then(() => {
        if (finalSlug !== undefined) {
          cy.request({
            method: 'DELETE',
            url: `${url}/articles/${slug}/favorite`,
            headers: {
              Authorization: 'Token ' + localStorage.getItem('jwtToken')
            }
          })
        }
      })
  }
}
