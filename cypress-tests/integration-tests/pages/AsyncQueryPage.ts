export type PageElement = Cypress.Chainable<JQuery>

export default class QueryPage {
  reportDetails = (): PageElement => cy.xpath(`//*[@id="main-content"]/details`)

  reportDetailsTable = (): PageElement => cy.xpath(`//* [@id="main-content"]/details/div/div/table`)

  filtersContainer = (): PageElement => cy.xpath(`//*[@id="async-filters-form"]/div[1]/div`)

  radioFilterButton = (): PageElement => cy.xpath(`//*[@id="filters.field1-2"]`)

  radioSortButton = (): PageElement => cy.xpath(`//*[@id="sortColumn-2"]`)

  resetFiltersButton = (): PageElement => cy.xpath(`//*[@id="async-request-reset-filters-button"]`)

  submitFiltersButton = (): PageElement => cy.xpath(`//*[@id="async-request-report-button"]`)
}
