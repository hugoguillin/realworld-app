const ARTICLE_TITLE = 'app-article-preview h1'
const LIKE_BUTTON = 'app-favorite-button button'

export default class GlobalFeedPage {
  static visit() {
    cy.visit('/')
  }

  static getArticlesTitles() {
    return cy.getByTestId("article-title").map('textContent')
  }
  static likeArticle() {
    cy.getByTestId("fav-button").eq(0).click()
  }

  static getAmountOfLikes(articleIndex = 0) {
    return cy
      .getByTestId("fav-button")
      .eq(articleIndex)
      .invoke('text')
      .then(text => {
        const numberOfLikes = text.replace(/\D+/g, '')
        return parseInt(numberOfLikes.toString())
      })
  }
}
