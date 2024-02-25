import { faker } from '@faker-js/faker'

export default class Utils {
  static generateNewArticleFixture() {
    cy.writeFile('cypress/fixtures/articleData.json', {
      article: {
        title: `${faker.lorem.words(5)}`,
        description: `${faker.lorem.sentence(8)}`,
        body: `${faker.lorem.paragraphs(2)}`,
        tagList: [faker.lorem.word(), faker.lorem.word()]
      }
    })
  }
}
