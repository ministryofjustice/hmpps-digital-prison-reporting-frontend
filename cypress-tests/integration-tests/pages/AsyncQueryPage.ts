export type PageElement = Cypress.Chainable<JQuery>

export default class QueryPage {
  reportDetails = (): PageElement => cy.xpath(`//*[@id="main-content"]/details`).first()

  reportDetailsTable = (): PageElement => cy.xpath(`//* [@id="main-content"]/details/div/div/table`)

  filtersContainer = (): PageElement => cy.xpath(`//*[@id="async-filters-form"]/div[1]/div`)

  radioFilterButton = (): PageElement => cy.xpath(`//*[@id="filters.field1-2"]`)

  radioSortButton = (): PageElement => cy.xpath(`//*[@id="sortColumn-2"]`)

  resetFiltersButton = (): PageElement => cy.xpath(`//*[@id="async-request-reset-filters-button"]`)

  submitFiltersButton = (): PageElement => cy.xpath(`//*[@id="async-request-report-button"]`)

  // Selected filters ----

  resetSelectedFiltersButton = (): PageElement => cy.get(`#async-request-reset-filters-button`)

  // DPD default selected filters
  defaultSelectedFilter_field1 = (): PageElement => cy.get(`#dpr-selected-filters > a:nth-child(1)`)

  defaultSelectedFilter_startDate = (): PageElement => cy.get(`#dpr-selected-filters > a:nth-child(2)`)

  defaultSelectedFilter_endDate = (): PageElement => cy.get(`#dpr-selected-filters > a:nth-child(3)`)

  defaultSelectedFilter_field7 = (): PageElement => cy.get(`#dpr-selected-filters > a:nth-child(4)`)

  defaultSelectedFilter_field8 = (): PageElement => cy.get(`#dpr-selected-filters > a:nth-child(5)`)

  // Save defaults ----

  saveFiltersAsDefaultsButton = (): PageElement => cy.get(`#dpr-save-user-defaults`)

  deleteFiltersAsDefaultsButton = (): PageElement => cy.get(`#dpr-remove-user-defaults`)
}
