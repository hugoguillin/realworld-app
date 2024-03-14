// data-testId attributes
const FOLLOW_BUTTON = 'follow-button'

export default class FollowAuthorButton {
  static getFollowAuthorButton() {
    return cy.getByTestId(FOLLOW_BUTTON).first()
  }
}
