export type PageElement = Cypress.Chainable<JQuery>

export default class SearchPage {
  textBox = (): PageElement => cy.get(`.dpr-search-box`)

  results = (): PageElement => cy.get(`.dpr-search-table tbody tr:not(.dpr-search-option-hide)`)
}
