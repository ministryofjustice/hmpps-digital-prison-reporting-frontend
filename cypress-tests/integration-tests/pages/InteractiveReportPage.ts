export type PageElement = Cypress.Chainable<JQuery>

export default class InteractiveReportPage {
  updateFiltersAccordion = (): PageElement => cy.xpath(`//*[@id="dpr-interactive-filters-details"]/summary`)

  updateFiltersDetails = (): PageElement => cy.xpath(`//*[@id="dpr-interactive-filters-details"]`)

  selectedFilterOne = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div/div[2]/div[1]/div[2]/div/div/a[1]`)

  selectedFilterTwo = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div/div[2]/div[1]/div[2]/div/div/a[2]`)

  selectedFilterThree = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div/div[2]/div[1]/div[2]/div/div/a[3]`)

  applyFiltersButton = () => cy.xpath(`//*[@id="interactive-apply-filters-button"]`)

  resetFiltersButton = () => cy.xpath(`//*[@id="interactive-reset-filters-button"]`)

  radioFilterInput = () => cy.xpath(`//*[@id="filters.field1-2"]`)

  textFilterInput = () => cy.xpath(`//*[@id="filters.field6"]`)
}
