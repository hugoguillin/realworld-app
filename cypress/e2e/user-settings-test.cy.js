import UserSettingsPage, { UserSettingsFields } from "../page-objects/user-settings-page";
import Utils from "../utils/utils";

describe('user-settings-test', () => {
  let fieldsToUpdate
  before(() => {
    cy.setJwtTokenAsEnv(Cypress.env('email'), Cypress.env('password'))
  })
  beforeEach(() => {
    cy.loginWithSession(Cypress.env('email'), Cypress.env('password'))
    fieldsToUpdate = Utils.generateUserSettingsData()
    UserSettingsPage.visit()
  })
  it('updates url of profile picture', () => {
    UserSettingsPage.updateField(UserSettingsFields.image, fieldsToUpdate.image)
    UserSettingsPage.userPic().invoke('attr', 'src').should('eq', fieldsToUpdate.image)
  })
  it('updates username', () => {
    UserSettingsPage.updateField(
      UserSettingsFields.username,
      fieldsToUpdate.username
    )
    UserSettingsPage.userPic().should('have.text', fieldsToUpdate.username)
  })
  it('updates user bio', () => {
    UserSettingsPage.updateField(UserSettingsFields.bio, fieldsToUpdate.bio)
  })
  it('updates email', () => {
    UserSettingsPage.updateField(UserSettingsFields.email, fieldsToUpdate.email)
  })
  it('updates password', () => {
    UserSettingsPage.updateField(
      UserSettingsFields.password,
      fieldsToUpdate.password
    )
  })
  it('updates all fields at once', () => {
    UserSettingsPage.updateAllFields(fieldsToUpdate.user)
  })
})