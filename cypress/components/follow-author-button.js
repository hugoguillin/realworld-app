const FOLLOW_BUTTON = 'app-follow-button button'

export default class FollowAuthorButton {
  static getFollowAuthorButton() {
    return cy.get(FOLLOW_BUTTON).first()
  }
}
