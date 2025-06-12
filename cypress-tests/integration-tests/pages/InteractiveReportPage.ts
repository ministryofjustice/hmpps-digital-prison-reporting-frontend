export type PageElement = Cypress.Chainable<JQuery>

export default class InteractiveReportPage {
  updateFiltersAccordion = (): PageElement => cy.xpath(`//*[@id="dpr-interactive-filters-details"]/summary`)

  updateFiltersDetails = (): PageElement => cy.xpath(`//*[@id="dpr-interactive-filters-details"]`)

  selectedFilterOne = (): PageElement => cy.xpath(`//*[@id="dpr-selected-filters"]/a[1]`)

  selectedFilterTwo = (): PageElement => cy.xpath(`//*[@id="dpr-selected-filters"]/a[2]`)

  selectedFilterThree = (): PageElement => cy.xpath(`//*[@id="dpr-selected-filters"]/a[3]`)

  applyFiltersButton = () => cy.xpath(`//*[@id="interactive-apply-filters-button"]`)

  resetFiltersButton = () => cy.xpath(`//*[@id="interactive-reset-filters-button"]`)

  radioFilterInput = () => cy.xpath(`//*[@id="filters.field1-2"]`)

  textFilterInput = () => cy.xpath(`//*[@id="filters.field6"]`)
}
