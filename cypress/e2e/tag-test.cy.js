import TagsApi from '../api-utils/tags-api'
import TagsPage from '../page-objects/tags-page'
import ArticlesApi from '../api-utils/article-api'
import GlobalFeedPage from '../page-objects/global-feed-page'

describe('Checking the tags', () => {
  before(() => {
    cy.setJwtTokenAsEnv(Cypress.env('email'), Cypress.env('password'))
  })
  beforeEach(() => {
    cy.loginWithSession(Cypress.env('email'), Cypress.env('password'))
    cy.visit('/')
  })

  it('Check that all popular tags are displayed', () => {
    let front = []
    TagsPage.getPopularTags().then(tags => {
      front = tags.map(tag => tag.toString().trim())
    })
    TagsApi.getPopularTags().should(tagsBack => {
      expect(front).to.deep.members(tagsBack)
    })
  })

  it('Filter articles by tag', () => {
    cy.intercept('GET', '**/articles?tag=*').as('getArticlesByTag')
    TagsPage.getRandomTag().then(tagName => {
      TagsPage.filterByTag(tagName)
      TagsPage.getTagTab().should('contain.text', tagName)
      cy.wait('@getArticlesByTag')
      GlobalFeedPage.getArticlesTitles().then(titles => {
        ArticlesApi.getArticlesByTag(tagName).then(articles => {
          expect(titles, 'Articles titles front').to.deep.members(
            articles.map(article => article.title)
          )
        })
      })
    })
  })
})