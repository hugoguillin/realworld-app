const DEFAULT_PROFILE_IMAGE_URL =
  'https://api.realworld.io/images/smiley-cyrus.jpeg'

export const UserSettingsFields =  {
  image: 'profile-image',
  username: 'username',
  bio: 'bio',
  email: 'email',
  password: 'password'
}

export default class UserSettingsPage {
  static visit() {
    cy.visit('/settings')
  }

  static userPic() {
    return cy.getByTestId('user-pic')
  }

  static updateField(fieldName, fieldValue) {
    cy.getByTestId(fieldName).clear().type(fieldValue)
    this.submitForm()
  }

  static updateAllFields(userSettings) {
    if (userSettings.image) {
      cy.getByTestId(UserSettingsFields.image).clear().type(userSettings.image)
    }
    if (userSettings.username) {
      cy.getByTestId(UserSettingsFields.username)
        .clear()
        .type(userSettings.username)
    }
    if (userSettings.bio) {
      cy.getByTestId(UserSettingsFields.bio).clear().type(userSettings.bio)
    }
    if (userSettings.email) {
      cy.getByTestId(UserSettingsFields.email).clear().type(userSettings.email)
    }
    if (userSettings.password) {
      cy.getByTestId(UserSettingsFields.password)
        .clear()
        .type(userSettings.password)
    }
    this.submitForm()
  }

  static submitForm() {
    cy.get('button[type="submit"]').click()
  }

  static performLogout() {
    cy.getByTestId('logout').click()
  }
}
