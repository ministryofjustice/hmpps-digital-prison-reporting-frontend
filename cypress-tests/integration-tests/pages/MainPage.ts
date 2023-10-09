export type PageElement = Cypress.Chainable<JQuery>

export default class MainPage {
  cards = (): PageElement => cy.get(`.card`)

  card = (index: number): PageElement => cy.get(`.card:eq(${index})`)

  showFilterButton = (): PageElement => cy.get(`.filter-summary-show-filter-button`)

  clearAllButton = (): PageElement => cy.get(`.moj-button-menu__wrapper .govuk-button--primary`)

  pagingLink = (): PageElement => cy.get('.govuk-pagination__link').first()

  pageSizeSelector = (): PageElement => cy.get('#pageSize')

  filterPanel = (): PageElement => cy.get('.moj-filter')

  filter = (id): PageElement => cy.get(`#filters\\.${id}`)

  dataTable = (): PageElement => cy.get('table')

  applyFiltersButton = (): PageElement => cy.get(`[data-apply-form-to-querystring='true']`)

  selectedFilterButton = (): PageElement => cy.get('.filter-summary-remove-button')

  unsortedSortColumnLink = (): PageElement => this.dataTable().find(`a[aria-sort='none']`).first()

  currentSortColumnLink = (): PageElement => this.dataTable().find(`a[aria-sort!='none']`).first()
}
