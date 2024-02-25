import TagsApi from '../api-utils/tags-api'

// data-testid attributes
const TAG_PILL = 'popular-tag'
const TAG_TAB = 'tag-feed'
export default class TagsPage {
	static getTag() {
		return cy.getByTestId(TAG_PILL)
	}
	static getPopularTags() {
		return this.getTag()
			.invoke('toArray')
			.then(tags => cy.wrap(tags.map(tag => tag.textContent)))
	}

	static filterByTag(tagName = '') {
		cy.getByTestId(TAG_PILL).contains(tagName).click()
	}

	static getRandomTag() {
		return TagsApi.getPopularTags().then(tags => {
			return Cypress._.sample(tags)
		})
	}

	static getTagTab() {
		return cy.get(TAG_TAB).parent()
	}

}
