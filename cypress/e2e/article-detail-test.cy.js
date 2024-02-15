import GlobalFeedPage from '../page-objects/global-feed-page'
import FavoritesApi from '../api-utils/favorites-api'
import ArticleDetailPage from '../page-objects/article-detail-page'
import AuthorApi from '../api-utils/author-api'
import FollowAuthorButton from '../components/follow-author-button'

const articleIndex = 0
// let loginData
describe('Checking article detail page', () => {
  before(() => {
    cy.loginViaApi(Cypress.env('email'), Cypress.env('password'))
    AuthorApi.unfollowAuthor(articleIndex)
    FavoritesApi.unfavoriteArticle()
  })
  beforeEach(() => {
    cy.loginWithSession(Cypress.env('email'), Cypress.env('password'))
    ArticleDetailPage.visit()
    // cy.fixture('loginData').then(d => {
    //   loginData = d.user.username
    // })
  })
  it.only('Give a like to an article', () => {
    cy.intercept('POST', '**/articles/**/favorite').as('postFavorite')
    GlobalFeedPage.getAmountOfLikes().then(amount => {
      cy.giveLikeToAnArticle()
      cy.wait('@postFavorite').its('response.statusCode').should('eq', 200)
      cy.wait(500)
      GlobalFeedPage.getAmountOfLikes().then(newAmount => {
        expect(newAmount).to.eq(amount + 1)
      })
    })
  })

  it('Leave a comment and the delete it', () => {
    const message = 'Some random message'
    ArticleDetailPage.sendComment(message)
    ArticleDetailPage.getCommentCard()
      .find('p')
      .invoke('text')
      .then(text => {
        expect(text.trim()).to.equal(message)
      })
    ArticleDetailPage.getCommentCard()
      .find('a')
      .eq(1)
      .invoke('text')
      .then(text => {
        expect(text.trim()).to.equal(Cypress.env("username"))
      })
    ArticleDetailPage.deleteComment()
    ArticleDetailPage.getCommentCard().should('not.exist')
  })
  it('Start following an author', function () {
    FollowAuthorButton.getFollowAuthorButton().as('followButton').click()
    cy.get('@followButton').should('contain.text', 'Unfollow')
    cy.get('@followButton').click()
    cy.get('@followButton').should('contain.text', 'Follow')
  })
})
