import NewArticlePage from '../page-objects/new-article-page'
import ArticleDetailPage from '../page-objects/article-detail-page'
import ArticlesApi from '../api-utils/article-api'
import Utils from '../utils/utils'
import GlobalFeedPage from '../page-objects/global-feed-page'

describe('Check CRUD actions on articles', () => {
  let newArticle
  before(() => {
    cy.setJwtTokenAsEnv(Cypress.env('email'), Cypress.env('password'))
  })
  beforeEach(() => {
    ArticlesApi.deleteAuthorArticles(Cypress.env("username"))
    Utils.generateNewArticleFixture()
    cy.fixture('articleData').then((data) => {
      newArticle = data
    })
    cy.loginWithSession(Cypress.env('email'), Cypress.env('password'))
    NewArticlePage.visit()
  })
  it('creates an article and redirects to article details', function () {
    NewArticlePage.fillArticleForm(newArticle.article)
    NewArticlePage.publishArticle()
    //Yields article title from url and compares it to title in fixture after replacing spaces with dashes
    cy.url().should('include', newArticle.article.title.replace(/\s/g, '-'))
    ArticleDetailPage.getArticleBody().should(
      'have.text',
      newArticle.article.body
    )
    ArticleDetailPage.getArticleTags().should(
      'have.deep.members',
      newArticle.article.tagList
    )
  })
  it('edits an existing article', () => {
    const editedData = {
      title: ' edited title',
      description: 'Edited description',
      body: 'Edited body'
    }
    ArticlesApi.createNewArticle(newArticle).then(slug => {
      cy.visit(`/article/${slug}`)
    })
    ArticleDetailPage.goToEditArticle()
    NewArticlePage.editArticle(editedData)

    cy.url().should('include', editedData.title.replace(/\s/g, '-'))
    ArticleDetailPage.getArticleBody().should('contain.text', editedData.body)
    // cy.get('.tag-list li').should('not.exist')
  })

})
