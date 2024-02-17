// data-testid attributes
const ARTICLE_TITLE = 'article-title'
const FAV_BUTTON = 'fav-button'

export default class GlobalFeedPage {
  static visit() {
    cy.visit('/')
  }

  static getArticlesTitles() {
    return cy.getByTestId(ARTICLE_TITLE).map('textContent')
  }
  static likeArticle() {
    cy.getByTestId(FAV_BUTTON).eq(0).click()
  }

  static getAmountOfLikes(articleIndex = 0) {
    return cy
      .getByTestId(FAV_BUTTON)
      .eq(articleIndex)
      .stable('text', 200, {timeout: 800}) // On page load, takes a litte while for the text to appear
      .invoke('text')
      .then(text => {
        const numberOfLikes = text.replace(/\D+/g, '')
        return parseInt(numberOfLikes)
      })
  }
}
