const url = Cypress.env('apiUrl')

export default class Articles {
  static getArticles() {
    return cy.request(url + '/articles?limit=10').then(response => {
      expect(response.status).to.eq(200)
      return response.body.articles
    })
  }
  static getArticlesByAuthor(authorName) {
    return cy
      .request({
        url: url + `/articles?author=${authorName}&limit=10`,
        headers: {
          Authorization: 'Token ' + Cypress.env('token')
        }
      })
      .then(response => {
        expect(response.status).to.eq(200)
        return response.body.articles
      })
  }

  static getArticlesByTag(tagName) {
    return cy
      .request({
        url: url + `/articles?tag=${tagName}&limit=10`,
        headers: {
          Authorization: 'Token ' + Cypress.env('token')
        }
      })
      .then(response => {
        expect(response.status).to.eq(200)
        return response.body.articles
      })
  }

  static deleteAuthorArticles(authorName) {
    Articles.getArticlesByAuthor(authorName).then(articles => {
      articles.forEach((article) => {
        cy.request({
          method: 'DELETE',
          url: `${url}/articles/${article.slug}`,
          headers: {
            Authorization: 'Token ' + Cypress.env('token')
          }
        })
      })
    })
  }

  static createNewArticle(article) {
    return cy
      .request({
        method: 'POST',
        url: `${url}/articles`,
        body: article,
        headers: {
          Authorization: 'Token ' + Cypress.env('token')
        }
      })
      .then(response => {
        return response.body.article.slug
      })
  }
}
