import { faker } from '@faker-js/faker'

export default class Utils {
  static generateNewArticleFixture(includeTags = true) {
    let tagList = []
    if (includeTags) {
      tagList = [faker.lorem.word(), faker.lorem.word()]
    }
    return {
      article: {
        title: `${faker.lorem.words(5)}`,
        description: `${faker.lorem.sentence(8)}`,
        body: `${faker.lorem.paragraphs(2)}`,
        tagList: tagList
      }
    }
  }
}
