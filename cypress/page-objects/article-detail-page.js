import ArticlesApi from '../api-utils/article-api'

const COMMENT_TEXTAREA = 'textarea'
const POST_COMMENT_BUTTON = 'form button'
const COMMENT_CARD = 'app-article-comment'
const TAG_PILLS = '.tag-list li'

export default class ArticleDetailPage {
  static visit(articleIndex = 0) {
    let slug = ''
    ArticlesApi.getArticles()
      .then(articles => {
        slug = articles[articleIndex].slug
      })
      .then(() => {
        cy.visit(`/article/${slug}`)
      })
  }
  static sendComment(comment) {
    cy.get(COMMENT_TEXTAREA).type(comment)
    cy.get(POST_COMMENT_BUTTON).click()
  }
  static getCommentCard() {
    return cy.get(COMMENT_CARD)
  }

  static deleteComment() {
    this.getCommentCard().find('i').click()
  }

  static getArticleTags() {
    return cy.get(TAG_PILLS).then(tagList => {
      return tagList.map((_t, e) => e.textContent.trim()).get()
    })
  }

  static getArticleBody() {
    return cy.get('p')
  }

  static goToEditArticle() {
    cy.contains('Edit Article').click()
    cy.url().should('include', 'editor')
  }
}
